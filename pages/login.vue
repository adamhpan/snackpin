<template>
  <div class="col-md-4 mx-auto mt-5">
    <h1>Login</h1>
    <div v-if="loginError" class="alert alert-danger" role="alert">
      {{ loginError }}
    </div>
    <br v-else>
    <form @submit="loginSubmit">
      <div class="form-group">
        <label for="">Email</label>
        <input class="form-control" v-model="email" type="email" required>
      </div>
      <div class="form-group">
        <label for="">Password</label>
        <input class="form-control" v-model="password" type="password" required>
      </div>
      <button type="submit" class="btn btn-warning text-white">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "login",
  created() {
    this.setLoginError("");
  },
  computed: {
    ...mapGetters(["user", "loginError"]),
  },
  methods: {
    ...mapMutations(["setLoginError"]),
    ...mapActions(["login"]),
    async loginSubmit(e) {
      e.preventDefault();

      this.login({
          email: this.email,
          password: this.password
      }).then(() => {
        this.$router.push("/");
      });
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
