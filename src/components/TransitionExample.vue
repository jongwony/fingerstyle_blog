<template>
  <div>
    <button @click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show">Hello!</p>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "TransitionExample",
    data() {
      return {show: true}
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
