<template>
  <nav class="navbar navbar-expand-sm">
    <a href="/" class="navbar-brand text-warning">
      <i class="fas fa-ice-cream"></i>
      Snackpin
    </a>

    <ul v-if="this.user" class="navbar-nav ml-auto">
      <li class="nav-item">
        <span class="nav-link" @click="logout">Logout</span>
      </li>
    </ul>
    <ul v-else class="navbar-nav ml-auto">
      <li class="nav-item active">
        <nuxt-link class="nav-link" to="login">Login</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="signup">Signup</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["logout"])
  }
}
</script>

<style>

</style>
