<template>
  <div id="app" class="hero is-dark container is-widescreen main">
    <div class="main2">
      <div>
        <img src="./assets/templates/logo.png" class="logo">
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>

<style lang="sass">
  @import '~bulma/sass/utilities/_all'
  @import '~bulma/bulma'

  .logo
    height: 80px
    width: 200px

  .main
    background-image: url("./assets/templates/main.jpg")

  .main2
    min-height: 650px
</style>
