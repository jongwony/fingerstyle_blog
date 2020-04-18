<template>
  <div id="app">
    <img src="./assets/logo.png" alt="">
    <HelloWorld/>
    <AxiosExample/>
    <PrototypeContextExample/>
    <TransitionExample/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import AxiosExample from "./components/AxiosExample";
import PrototypeContextExample from "./components/PrototypeContextExample";
import TransitionExample from "./components/TransitionExample";

export default {
  name: 'App',
  components: {
    TransitionExample,
    PrototypeContextExample,
    AxiosExample,
    HelloWorld,
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
  margin-top: 60px;
}
</style>
