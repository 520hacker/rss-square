<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <PageHeader msg="Welcome to RSS Square App"/>
</template>

<script>
import PageHeader from './components/PageHeader.vue'

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
body {
    margin: 0;
    width: 100%;
    min-width: 320px;
    min-height: 100vh;
    line-height: 1.4;
    font-size: 16px;
    font-weight: 400;
    color: var(--text-color);
    background-color: var(--bg-color);
    direction: ltr;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color var(--el-transition-duration-fast);
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
