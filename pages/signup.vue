<template>
  <form class="col-md-4 mx-auto mt-5">
    <h1>Signup</h1>
    <div class="form-group">
      <label for="">Email</label>
      <input class="form-control" v-model="email" type="text" placeholder="email">
    </div>
    <div class="form-group">
      <label for="">Password</label>
      <input class="form-control" v-model="password" type="password" placeholder="password">
    </div>
    <div class="form-group">
      <label for="">Confirm password</label>
      <input class="form-control" v-model="confirmPassword" type="password" placeholder="confirm password">
    </div>
    <div>{{ signupError }}</div>
    <button class="btn btn-warning" @click="onClickSignup">Signup</button>
  </form>
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
