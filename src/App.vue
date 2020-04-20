<template>
  <div id="app" :style="{ backgroundImage: `url(${bg_image})` }">
    <NavigationBar/>
    <router-view/>
  </div>
</template>

<script>
  import NavigationBar from "./components/NavigationBar";

  export default {
    name: 'App',
    data() {
      return {bg_image: require('./assets/glowing_light_wave.webp')}
    },
    components: {
      NavigationBar,
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #343a40;
    background-size: cover;
    background-repeat: repeat-y;
    min-height: 100vh;
  }
</style>
