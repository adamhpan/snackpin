<template>
  <div class="col-md-4 mx-auto mt-5">
    <h1>Login</h1>
    <div class="form-group">
      <label for="">Email</label>
      <input class="form-control" v-model="email" type="email" placeholder="email">
    </div>
    <div class="form-group">
      <label for="">Password</label>
      <input class="form-control" v-model="password" type="password" placeholder="password">
    </div>
    <button class="btn btn-warning text-white" @click="onClick">Login</button>
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
      email: "adamhpan@gmail.com",
      password: "123"
    }
  }
}
</script>

<style>

</style>
