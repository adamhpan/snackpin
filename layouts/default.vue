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
  },
  head () {
    return {
      script: [
        {
          src:"https://kit.fontawesome.com/e2f3de1ff4.js",
          crossorigin:"anonymous"
        },
        {
          src: "https://code.jquery.com/jquery-3.4.1.slim.min.js",
          integrity: "sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n",
          crossorigin: "anonymous",
          body: true
        }, {
          src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
          integrity: "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo",
          crossorigin: "anonymous",
          body: true
        }, {
          src: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
          integrity: "sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6",
          crossorigin: "anonymous",
          body: true
        }
      ],
      link: [
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        }
      ]
    }
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
