<template>
  <button class="button" v-bind:class="{ loggedIn: isLoggedIn, loggedOut: !isLoggedIn}">
    <template v-if="isLoggedIn">Logout</template>
    <template v-else>Login</template>
  </button>
</template>

<script>
export default {
  props: {
    isLoggedIn: false
  }
}

</script>

<style scoped>
.loggedIn {
  background-color: green;
}

.loggedOut {
  background-color: gray;
}
</style>
