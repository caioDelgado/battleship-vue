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
          <td v-for="x in y.rows" :class="isDamage(x)" @click="select({x: x.x, y: y.y})"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  const defaultColumn = () => [
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
  ]

  export default {
    data () {
      return {
        ship: {
          id: 0,
          length: 0
        },
        test: null
      }
    },
    props: {
      myFleet: {type: Array, default: null},
      lengthTable: {type: Number, default: 10},
      isPlaying: {type: Boolean, default: true},
      itsMe: {type: Boolean, default: true},
      columns: {
        type: Array,
        default: defaultColumn
      }
    },
    methods: {
      isDamage (x) {
        if (this.itsMe) {
          if (x.me && x.hit) return 'is-danger'
          if (x.me && !x.hit) return 'is-dark'
          if (!x.me && x.hit) return 'is-info'
        } else {
          if (x.hit && x.me) return 'is-danger'
          if (x.hit) return 'is-info'
          if (x.me) return ''
        }
        return ''
      },
      setShip (args) {
        this.ship.id = args.id
        this.ship.length = args.length
      },
      select (args) {
        if (this.isPlaying && !this.itsMe && !this.columns[args.y].rows[args.x].hit) {
          this.columns[args.y].rows[args.x].hit = true
          this.$emit('onSelect', args)
        }
      }
    },
    mounted () {
      if (this.myFleet) {
        this.myFleet.map(ship => {
          this.columns[ship.y].rows[ship.x].me = true
        })
      }
    }
  }
</script>

<style scoped>

</style>
