<template>
  <div class="box column is-12">
    <div class="columns">
      <div class="column is-4">
        <input type="text" class="input" v-model="player" :disabled="isDisabled" @change="onChange">
      </div>
      <div class="column is-1">
        <a class="button is-info" @click="enter" :disabled="isDisabled">Entrar</a>
      </div>
      <div class="column is-4" v-if="isDisabled && !vIf()">
        <p>Aguardando segundo jogador ... ... ...</p>
      </div>
      <div class="column is-3" v-if="vIf() && isDisabled">
        <a class="button is-success" @click="start">Iniciar</a>
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
        game: ''
      }
    },
    components: {},
    methods: {
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
          this.playerNumber = 1
          this.players.push(this.player)
          this.record.set('players', this.players)
        }
      },
      start () {
        this.$router.push({
          name: 'initGame',
          params: {
            player: this.playerNumber,
            game: this.game,
            playerName: this.player
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
