<template>
  <div class="column is-12">
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <table-board ref="tableBoardUs" @onSelect="select" :isPlaying="isPlaying()" :itsMe="player === 1" :columns="columnsUs"></table-board>
        </div>
      </div>
      <div class="column is-6">
        <div class="box">
          <table-board ref="tableBoardThem" @onSelect="select" :isPlaying="isPlaying()" :itsMe="player === 2" :columns="columnsThem"></table-board>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TableBoard from '@/components/TableBoard'
  import FleetBoard from '@/components/FleetBoard'

  import * as ds from 'deepstream.io-client-js'

  export default {
    data () {
      return {
        ds: ds('wss://013.deepstreamhub.com?apiKey=9606832e-3795-4c89-ac0c-05e02b996285').login(),
        player: null,
        record: null,
        recordPlayer: null,
        idShip: 0,
        shipsFleet: [
          {id: 1, src: 'ship1.png', length: 1},
          {id: 2, src: 'ship2.png', length: 2},
          {id: 3, src: 'ship3.png', length: 3},
          {id: 4, src: 'ship4.png', length: 4},
          {id: 5, src: 'ship5.png', length: 5}
        ],
        orientation: 'H',
        columnsThem: [
          {y: 0, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 1, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 2, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 3, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 4, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 5, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 6, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 7, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 8, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 9, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]}
        ],
        columnsUs: [
          {y: 0, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 1, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 2, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 3, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 4, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 5, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 6, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 7, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 8, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]},
          {y: 9, rows: [{x: 0, hit: false}, {x: 1, hit: false}, {x: 2, hit: false}, {x: 3, hit: false}, {x: 4, hit: false}, {x: 5, hit: false}, {x: 6, hit: false}, {x: 7, hit: false}, {x: 8, hit: false}, {x: 9, hit: false}]}
        ],
        playerPlaying: null
      }
    },
    components: {
      TableBoard,
      FleetBoard
    },
    methods: {
      select () {
        if (this.playerPlaying === 1 && this.player === 1) {
          this.recordPlayer.set('playerPlaying', 2)
        } else {
          this.recordPlayer.set('playerPlaying', 1)
        }
        this.handleThem()
        this.handleUs()
      },
      isPlaying () {
        return this.player === this.playerPlaying
      },
      handleUs () {
        this.record.set('columnsUs', this.columnsUs)
      },
      handleThem () {
        this.record.set('columnsThem', this.columnsThem)
      }
    },
    created () {
      this.record = this.ds.record.getRecord(`battleship/game/${this.$route.params.game}`)
      this.recordPlayer = this.ds.record.getRecord(`battleship/player/${this.$route.params.game}`)
      this.player = this.$route.params.player

      if (this.player === 1) {
        this.record.set('columnsUs', this.$route.params.columns)
        this.columnsUs = this.$route.params.columns
      } else {
        this.record.set('columnsThem', this.$route.params.columns)
        this.columnsThem = this.$route.params.columns
      }

      this.recordPlayer.set('playerPlaying', 1)
      this.playerPlaying = 1

      this.record.subscribe(values => {
        this.columnsThem = values.columnsThem
        this.columnsUs = values.columnsUs
      })

      this.recordPlayer.subscribe(values => {
        this.playerPlaying = values.playerPlaying
      })
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
