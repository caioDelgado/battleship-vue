<template>
  <div class="hero is-info box column is-12">
    <section class="columns">
      <div class="column is-6 has-text-right">
        <a class="button is-light" @click="isNewPlayer = true">Soldado</a>
      </div>
      <div class="column is-6 has-text-left">
        <a class="button is-dark" @click="isNewPlayer = false">Veterano</a>
      </div>
    </section>
    <section class="hero columns" :class="isNewPlayer ? 'is-light' : 'is-dark'">
      <div class="column is-offset-one-quarter is-half hero is-info">
        <div v-if="isNewPlayer">
          <div class="field">
            <div class="control"><input type="text" v-model="newUser" placeholder="Usuário" class="input"></div>
          </div>
          <div class="field">
            <div class="control"><input type="password" v-model="newPassword" placeholder="Senha" class="input"></div>
          </div>
          <div class="field">
            <div class="control"><input type="password" v-model="confirmPassword" placeholder="Verificar Senha" class="input">
            </div>
          </div>
        </div>

        <div v-if="!isNewPlayer">
          <div class="field">
            <div class="control">
              <input type="text" class="input" v-model="userPlayer" placeholder="Usuário">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input type="password" class="input" v-model="passwordPlayer" placeholder="Senha">
            </div>
          </div>
          <br>
          <br>
        </div>
      </div>
    </section>
    <section class="hero is-info column is-offset-one-quarter is-half columns">
      <div class="column is-offset-one-quarter is-half">
        <a class="button is-dark" @click="isNewPlayer ? register() : enter()">{{isNewPlayer ? 'Alistar-se' : 'Entrar à bordo' }}</a>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        isNewPlayer: true,
        userPlayer: null,
        passwordPlayer: null,
        newUser: null,
        newPassword: null,
        confirmPassword: null
      }
    },
    methods: {
      ...mapActions('Login', ['login']),
      enter () {
        axios.get(`http://localhost:3001/api/login?user=${this.userPlayer}&password=${this.passwordPlayer}`)
          .then(response => {
            this.login(response.data)
            this.$router.push({
              name: 'awaitPlayers',
              params: { user: response.data.user }
            })
          })
          .catch(err => {
            alert(err.response.data.message)
          })
      },
      register () {
        alert('register')
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
