<template>
  <button type="submit" class="button" :disabled="loading" :class="{loggedIn: isLoggedIn, loggedOut: !isLoggedIn}">
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
    },
    loading: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    status: function () {
      if (this.loading) return '...'
      else return (this.isLoggedIn) ? 'Logout' : 'Login'
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

.button:disabled {
  background-color: grey;
}

.loggedIn {
  background-color: #4CAF50;
}

.loggedOut {
  background-color: #5C5FF0;
}
</style>
