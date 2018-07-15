<template>
  <div class="message-box" :class="msgType">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    msgType: {
      type: String,
      required: true,
      validator: function (value) {
        return [
          'error',
          'notice'
        ].indexOf(value) !== -1
      }
    }
  }
}
</script>

<style scoped>
.message-box{
  background-color: #dff0d8;
  border-color: #d0e9c6;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  color: #ffffff;
  border: 1px solid transparent;
  border-radius: .25rem;
}

.notice{
  background-color: #4CAF50;
}

.error{
  background-color: #a60000;
}
</style>
