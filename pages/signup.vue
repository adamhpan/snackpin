<template>
  <div>
    Signup
    <input v-model="email" type="text" placeholder="email">
    <input v-model="password" type="password" placeholder="password">
    <input v-model="confirmPassword" type="password" placeholder="confirm password">
    <div>{{ signupError }}</div>
    <button @click="onClickSignup">Signup</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import axios from "axios"

export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    }
  },
  created() {
    this.setSignupError("")
  },
  computed: {
    ...mapGetters(["signupError"])
  },
  methods: {
    ...mapMutations(["setSignupError"]),
    ...mapActions(["createUser", "signup"]),
    onClickSignup() {
      if(this.password !== this.confirmPassword) {
        // this.signupError = "Passwords don't match."
        return;
      }

      this.signup({
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.go("/")
      })
    }
  }
}
</script>

<style>

</style>
