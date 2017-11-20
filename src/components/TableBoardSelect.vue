<template>
  <div>
    <table class="table is-bordered is-fullwidth">
      <thead>
        <tr>
          <td v-for="i in lengthTable+1">{{i-1}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="y in columns">
          <td>{{y.y + 1}}</td>
          <td v-for="x in y.rows" :class="isSelected(x.me)" @click="select({x: x.x, y: y.y})"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        columns: [
          {y: 0, rows: [{x: 0, me: false}, {x: 1, me: false}, {x: 2, me: false}, {x: 3, me: false}, {x: 4, me: false}, {x: 5, me: false}, {x: 6, me: false}, {x: 7, me: false}, {x: 8, me: false}, {x: 9, me: false}]},
          {y: 1, rows: [{x: 0, me: false}, {x: 1, me: false}, {x: 2, me: false}, {x: 3, me: false}, {x: 4, me: false}, {x: 5, me: false}, {x: 6, me: false}, {x: 7, me: false}, {x: 8, me: false}, {x: 9, me: false}]},
          {y: 2, rows: [{x: 0, me: false}, {x: 1, me: false}, {x: 2, me: false}, {x: 3, me: false}, {x: 4, me: false}, {x: 5, me: false}, {x: 6, me: false}, {x: 7, me: false}, {x: 8, me: false}, {x: 9, me: false}]},
          {y: 3, rows: [{x: 0, me: false}, {x: 1, me: false}, {x: 2, me: false}, {x: 3, me: false}, {x: 4, me: false}, {x: 5, me: false}, {x: 6, me: false}, {x: 7, me: false}, {x: 8, me: false}, {x: 9, me: false}]},
          {y: 4, rows: [{x: 0, me: false}, {x: 1, me: false}, {x: 2, me: false}, {x: 3, me: false}, {x: 4, me: false}, {x: 5, me: false}, {x: 6, me: false}, {x: 7, me: false}, {x: 8, me: false}, {x: 9, me: false}]},
          {y: 5, rows: [{x: 0, me: false}, {x: 1, me: false}, {x: 2, me: false}, {x: 3, me: false}, {x: 4, me: false}, {x: 5, me: false}, {x: 6, me: false}, {x: 7, me: false}, {x: 8, me: false}, {x: 9, me: false}]},
          {y: 6, rows: [{x: 0, me: false}, {x: 1, me: false}, {x: 2, me: false}, {x: 3, me: false}, {x: 4, me: false}, {x: 5, me: false}, {x: 6, me: false}, {x: 7, me: false}, {x: 8, me: false}, {x: 9, me: false}]},
          {y: 7, rows: [{x: 0, me: false}, {x: 1, me: false}, {x: 2, me: false}, {x: 3, me: false}, {x: 4, me: false}, {x: 5, me: false}, {x: 6, me: false}, {x: 7, me: false}, {x: 8, me: false}, {x: 9, me: false}]},
          {y: 8, rows: [{x: 0, me: false}, {x: 1, me: false}, {x: 2, me: false}, {x: 3, me: false}, {x: 4, me: false}, {x: 5, me: false}, {x: 6, me: false}, {x: 7, me: false}, {x: 8, me: false}, {x: 9, me: false}]},
          {y: 9, rows: [{x: 0, me: false}, {x: 1, me: false}, {x: 2, me: false}, {x: 3, me: false}, {x: 4, me: false}, {x: 5, me: false}, {x: 6, me: false}, {x: 7, me: false}, {x: 8, me: false}, {x: 9, me: false}]}
        ],
        ship: {
          id: 0,
          length: 0
        }
      }
    },
    props: {
      lengthTable: {type: Number, default: 10},
      orientation: {type: String, default: 'H'}
    },
    methods: {
      isSelected (field) {
        return field ? 'is-dark' : ''
      },
      setShip (args) {
        this.ship.id = args.id
        this.ship.length = args.length
      },
      select (args) {
        if (this.ship.id !== 0) {
          if (this.orientation === 'H') {
            if (args.x + this.ship.length > this.lengthTable) {
              alert('Opa meu querido, não tem espaço aqui não')
              return
            }
          } else {
            if (args.y + this.ship.length > this.lengthTable) {
              alert('Opa meu querido, não tem espaço aqui não')
              return
            }
          }
          for (let i = 0; i < this.ship.length; i++) {
            if (this.orientation === 'H') {
              if (this.columns[args.y].rows[args.x + i].me === true && this.columns[args.y].rows[args.x + i].idShip !== this.ship.id) {
                alert('Jovem já tem barco aí')
                return
              }
            } else {
              if (this.columns[args.y + i].rows[args.x].me === true && this.columns[args.y + i].rows[args.x].idShip !== this.ship.id) {
                alert('Jovem já tem barco aí')
                return
              }
            }
          }
          this.columns.map(column => {
            return column.rows.map(row => {
              row.me = row.idShip === this.ship.id ? false : row.me
              row.idShip = row.idShip === this.ship.id ? undefined : row.idShip
            })
          })
          for (let i = 0; i < this.ship.length; i++) {
            if (this.orientation === 'H') {
              this.columns[args.y].rows[args.x + i].me = true
              this.columns[args.y].rows[args.x + i].idShip = this.ship.id
            } else {
              this.columns[args.y + i].rows[args.x].me = true
              this.columns[args.y + i].rows[args.x].idShip = this.ship.id
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
</style>
