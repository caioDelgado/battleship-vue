<template>
  <div>
    <div class="modal is-active" v-if="modalSkin">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Selecione um tema !</p>
        </header>
        <section class="modal-card-body columns">
          <div v-for="x in skins" class="column is-4">
            <div class="field">
              <img class="image" :src="imageUrl(x.src)">
            </div>
            <div class="field">
              <a class="button is-inverted" @click="selectSkin(x.src)">Tema: {{x.name}}</a>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="box column is-12">
      <div class="columns hero is-info">
        <div class="column is-offset-one-quarter is-half hero is-dark columns">
          <div class="colum is-12">
            <p>Seja bem vindo, {{player}} !</p>
          </div>
          <div class="column is-12">
            <a class="button is-info" @click="enter" v-if="!isDisabled">Novo jogo</a>
            <a class="button is-danger" @click="exit" v-if="!isDisabled">Sair</a>
            <div class="column is-12" v-if="isDisabled && !vIf()">
              <p>Aguardando segundo jogador ... ... ...</p>
            </div>
            <div class="column is-12" v-if="vIf() && isDisabled">
              <a class="button is-success" @click="start">Iniciar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as ds from 'deepstream.io-client-js'

  export default {
    data () {
      return {
        ds: ds('wss://013.deepstreamhub.com?apiKey=9606832e-3795-4c89-ac0c-05e02b996285').login(),
        players: [],
        player: null,
        record: null,
        playerNumber: 0,
        isDisabled: false,
        follow: '',
        game: '',
        modalSkin: false,
        skinSelected: '',
        skins: [
          {name: 'Piratas', src: 'tema-pirata.png'},
          {name: 'Guerra', src: 'tema-guerra.png'},
          {name: 'Espacial', src: 'tema-espacial.png'}
        ]
      }
    },
    components: {},
    methods: {
      selectSkin (skin) {
        this.skinSelected = skin
        this.modalSkin = false
      },
      imageUrl (img) {
        return require('@/assets/templates/themes/' + img)
      },
      enter () {
        this.record = this.ds.record.getRecord(`battleship/game/queue`)
        this.isDisabled = true
        if (this.players.length) {
          this.playerNumber = 2
          this.follow = this.players[0]
          this.record.set('follow', this.follow)
          this.game = Math.random()
          this.record.set('game', this.game)
          this.players = []
          this.record.set('players', this.players)
        } else {
          this.follow = ''
          this.record.set('follow', this.follow)
          this.playerNumber = 1
          this.players.push(this.player)
          this.record.set('players', this.players)
          this.showModalSkin()
        }
      },
      exit () {
        localStorage.clear()
        location.reload()
      },
      showModalSkin () {
        this.modalSkin = true
      },
      start () {
        this.$router.push({
          name: 'initGame',
          params: {
            player: this.playerNumber,
            game: this.game,
            playerName: this.player,
            skinSelected: this.skinSelected
          }
        })
      },
      vIf () {
        return this.playerNumber === 2 || (this.player === this.follow && this.player != null)
      },
      onChange () {
        this.record = this.ds.record.getRecord(`battleship/game/queue`)
      }
    },
    created () {
      this.record = this.ds.record.getRecord(`battleship/game/queue`)

      this.record.subscribe(values => {
        this.players = values.players
        this.follow = values.follow
        this.game = values.game
      })
    },
    mounted () {
      this.player = this.$route.params.user
      if (!this.player) this.player = localStorage.getItem('userLogged')
      if (!this.player) this.$router.push('/')
      if (this.$route.params.player) {
        this.player = this.$route.params.player
      }
    }
  }
</script>

<style lang="sass" scoped>
  .icon-edit
    font-size: 24px
    color: #ffa726
    cursor: pointer
  .fa-thumbs-o-down
    font-size: 62px
    color: #e34120
  .title
    font-size: 20px

</style>
