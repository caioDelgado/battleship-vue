<template>
  <div>
    <div v-for="ship in ships">
      <img class="image img" :src="imageUrl(ship.src)" @click="select(ship)" :class="selectedClass(ship.id)">
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        selectedShip: 0
      }
    },
    props: {
      ships: {type: Array, default: []}
    },
    methods: {
      select (args) {
        this.selectedShip = args.id
        this.$emit('select', args)
      },
      selectedClass (id) {
        return id === this.selectedShip ? 'img-selected' : ''
      },
      imageUrl (img) {
        return require('@/assets/templates/ships/' + img)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .img
    height: 75px
  .img-selected
      background-color: #dcdcdc
</style>
