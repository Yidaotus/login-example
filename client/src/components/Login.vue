<template>
  <div>
    <h1>Login</h1>
    <form class="login_form" v-on:submit.prevent="authenticate">
      <label class="txt_label" for="txt_username">Dein Benutzername</label>
      <input
        id="txt_username"
        class="txt_input"
        type="text"
        name="username"
        pattern="[A-Z;a-z;0-9]{4,42}"
        title="Der Benutzername darf nur aus Alphanumerischen Zeichen bestehen und zwischen 4 und 42 Zeichen lang sein."
        required
        v-model="loginform.username"
        :readonly="(user)"
        placeholder="Dein Benutzername" />
      <br>
      <auth-button :loading="loginform.loading" :isLoggedIn="this.user != null"/>
      <messagebox v-show="loginform.message.visible" :msgType="loginform.message.type"> {{ loginform.message.msg }} </messagebox>
    </form>
  </div>
</template>

<script>
import AuthButton from '@/components/AuthButton.vue'
import Messagebox from '@/components/Messagebox.vue'

import LoginForm from '@/classes/LoginForm'

export default {
  data () {
    return {
      loginform: new LoginForm(),
      user: null
    }
  },

  methods: {
    /**
     * Versuche den Benutzer des LoginForms zu authentifizieren.
     */
    authenticate () {
      // Stoppe Timeout einer vorherigen Nachricht
      if (this.to) {
        clearTimeout(this.to)
      }
      // Sollte ein user vorhanden sein logge diesen aus wenn nicht versuche
      // den User anhand des Benuternamen einzuloggen
      if (!this.user) {
        this.loginform.authenticate().then((user) => { this.user = user })
      } else {
        this.loginform.deauthenticate(this.user).then(() => { this.user = null })
      }
      // Blende Nachricht aus nach 5 Sekunden
      this.to = setTimeout(() => (this.loginform.message.visible = false), 5000)
    }
  },

  components: {
    'auth-button': AuthButton,
    'messagebox': Messagebox
  }
}

</script>

<style scoped>
.login_form {
  width: 80%;
  margin: 0 auto;
}

.txt_input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.txt_label {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    box-sizing: border-box;
}
</style>
