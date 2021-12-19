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
  :root {
    --element-size: 4rem;
    --background-color-primary: #1e1e1e;
    --background-color-secondary: #2d2d30;
    --accent-color: #3f3f3f;
    --text-primary-color: #cacaca;
  }
  :root.light-theme {
    --background-color-primary: #ebebeb;
    --background-color-secondary: #fafafa;
    --accent-color: #cacaca;
    --text-primary-color: #2c3e50;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--text-primary-color);
    background-color: var(--background-color-primary);
    background-size: cover;
    background-repeat: repeat-y;
    min-height: 100vh;
    overflow: auto;
  }
</style>
