<template>
  <div>
    <h1>Login</h1>
    <input
      type="text"
      name="username"
      v-model="username"
      placeholder="Dein Benutzername" />
    <br>
    <!-- @click ist laut eslint für vue v-on:click vorzuziehen -->
    <button
      @click="authenticate">
      Einloggen
    </button>
  </div>
</template>

<script>
import Authentication from '@/services/Authentication'
export default {
  data () {
    return {
      username: ''
    }
  },
  methods: {
    async authenticate () {
      const responce = await Authentication.check_username({
        username: this.username
      })
      console.log(responce.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
