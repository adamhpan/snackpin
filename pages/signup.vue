<template>
  <div class="col-md-4 mx-auto mt-5">
    <h1>Signup</h1>
    <div v-if="signupError" class="alert alert-danger" role="alert">
      {{signupError}}
    </div>
    <br v-else>
    <form @submit="onClickSignup">
      <div class="form-group">
        <label for="">Email</label>
        <input class="form-control" v-model="email" type="email" required>
      </div>
      <div class="form-group">
        <label for="">Password</label>
        <input class="form-control" v-model="password" type="password" required>
      </div>
      <div class="form-group">
        <label for="">Confirm password</label>
        <input class="form-control" v-model="confirmPassword" type="password" required>
      </div>
      <button class="btn btn-warning text-white">Signup</button>
    </form>
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
    this.setSignupError("");
  },
  computed: {
    ...mapGetters(["signupError"])
  },
  methods: {
    ...mapMutations(["setSignupError"]),
    ...mapActions(["createUser", "signup"]),
    onClickSignup(e) {
      e.preventDefault();

      if(this.password.length < 8) {
        this.setSignupError("Use 8 characters or more for your password.")
        return;
      }

      if(this.password !== this.confirmPassword) {
        this.setSignupError("Passwords don't match.")
        return;
      }

      this.signup({
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push("/");
      })
    }
  }
}
</script>

<style>

</style>
