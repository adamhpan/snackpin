<template>
  <div>
    Login
    <input v-model="email" type="text" placeholder="email">
    <input v-model="password" type="password" placeholder="password">
    <button @click="onClick">Login</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "login",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["login"]),
    async onClick() {
      await this.login({
          email: this.email,
          password: this.password
      });

      if(this.user) {
        this.$router.push("/")
      }
    }
  },
  data() {
    return {
      email: "",
      password: ""
    }
  }
}
</script>

<style>

</style>
