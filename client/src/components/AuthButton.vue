<template>
  <button class="button" :class="{loggedIn: isLoggedIn, loggedOut: !isLoggedIn}">
    {{ status }}
  </button>
</template>

<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    status: function () {
      return (this.isLoggedIn) ? 'Logout' : 'Login'
    }
  }
}
</script>

<style scoped>
.button {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.loggedIn {
  background-color: #4CAF50;
}

.loggedOut {
  background-color: #5C5FF0;
}
</style>
