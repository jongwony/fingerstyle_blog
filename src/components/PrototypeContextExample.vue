<template>
    <p>{{ message }}</p>
</template>

<script>
    export default {
        name: "PrototypeContextExample",
        data() {
          return {
            message: 'Hello'
          }
        },
        created() {
          console.log(this.message)
          this.$reverseText('message')
          console.log(this.message)
        },
    }
</script>

<style scoped>

</style>
