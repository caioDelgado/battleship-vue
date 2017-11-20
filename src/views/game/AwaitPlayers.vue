<template>
  <div class="box column is-12">
    <div class="columns">
      <div class="column is-4">
        <input type="text" class="input">
      </div>
      <div class="column is-1">
        <a class="button is-success">Iniciar</a></div>
    </div>
  </div>
</template>

<script>
  import * as ds from 'deepstream.io-client-js'

  export default {
    data () {
      return {
        ds: ds('wss://013.deepstreamhub.com?apiKey=9606832e-3795-4c89-ac0c-05e02b996285').login()
      }
    },
    components: {},
    methods: {},
    created () {
      this.record = this.ds.record.getRecord(`battleship/game/queue`)

      this.record.subscribe(values => {
        this.columnsThem = values.columnsThem
        this.columnsUs = values.columnsUs
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
