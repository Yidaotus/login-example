<template>
  <div>
    <h1>Login</h1>
    <input
      type="text"
      name="username"
      v-model="User.username"
      placeholder="Dein Benutzername" />
    <br>
    <auth-button @click.native="authenticate" v-bind:isLoggedIn="User.loggedIn"/>
  <div class="error" v-html="error" />
  </div>
</template>

<script>
import Authentication from '@/services/Authentication'
import AuthButton from '@/components/AuthButton.vue'

export default {
  data () {
    return {
      User: {
        username: '',
        loggedIn: false
      },
      error: null
    }
  },
  methods: {
    async authenticate () {
      if (!this.User.loggedIn) {
        try {
          await Authentication.check_username({
            username: this.User.username
          })
          this.error = null
          this.User.loggedIn = true
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        this.User.loggedIn = false
      }
    },
    deauthenticate () {
    }
  },
  components: {
    'auth-button': AuthButton
  }
}

</script>

<style scoped>
.error {
  color: red;
}
</style>
