<template>
  <nav class="navbar navbar-expand-sm">
    <a href="#" class="navbar-brand text-warning">
      <i class="fas fa-ice-cream"></i>
      Snackpin
    </a>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <nuxt-link class="nav-link" to="login">Login</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="login">Signup</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style>

</style>
