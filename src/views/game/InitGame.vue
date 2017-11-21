<template>
  <div class="column is-12">
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <table-board ref="tableBoard" :orientation="orientation"></table-board>
        </div>
      </div>
      <div class="column is-6">
        <div class="box">
          <div class="columns">
            <div class="column is-4">
              <div class="control">
                <label class="radio">
                  <input type="radio" name="orientation" value="V" v-model="orientation">
                  Vertical
                </label>
                <label class="radio">
                  <input type="radio" name="orientation" value="H" v-model="orientation" checked>
                  horizontal
                </label>
              </div>
            </div>
            <div class="column is-2 is-offset-6">
              <a class="button is-primary" @click="startTheGame">Iniciar</a>
            </div>
          </div>
        </div>
        <div class="box">
          <fleet-board ref="fleetBoard" @select="select" :ships="shipsFleet"></fleet-board>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TableBoard from '@/components/TableBoardSelect'
  import FleetBoard from '@/components/FleetBoard'
  export default {
    data () {
      return {
        idShip: 0,
        shipsFleet: [
          {id: 1, src: 'ship1.png', length: 1},
          {id: 2, src: 'ship2.png', length: 2},
          {id: 3, src: 'ship3.png', length: 3},
          {id: 4, src: 'ship4.png', length: 4},
          {id: 5, src: 'ship5.png', length: 5}
        ],
        orientation: 'H',
        ships: []
      }
    },
    components: {
      TableBoard,
      FleetBoard
    },
    methods: {
      select (args) {
        this.idShip = args
        this.$refs.tableBoard.setShip(args)
      },
      startTheGame () {
        let fleet = {}
        for (let y = 0; y < this.$refs.tableBoard.columns.length; y++) {
          for (let x = 0; x < this.$refs.tableBoard.columns[y].rows.length; x++) {
            if (this.$refs.tableBoard.columns[y].rows[x].me) {
              let ship = {
                x: x,
                y: y,
                id: this.$refs.tableBoard.columns[y].rows[x].idShip,
                status: true
              }
              if (!fleet[ship.id]) fleet[ship.id] = []
              fleet[ship.id].push(ship)
            }
          }
        }

        this.$router.push({
          name: 'theGame',
          params: {
            columns: this.$refs.tableBoard.columns,
            player: this.$route.params.player,
            game: this.$route.params.game,
            fleet: fleet
          }
        })
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
