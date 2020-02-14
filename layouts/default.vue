<template>
  <div class="container-fluid">
    <Navbar></Navbar>
    <nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";

export default {
  components: {
    Navbar
  }
}
</script>

<style>
  html {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  body {
    height: 100%;
    width: 100%;
  }

  div#__nuxt, #__layout, #__layout>div, #app {
    height: 100%;
    width: 100%;
  }
</style>
