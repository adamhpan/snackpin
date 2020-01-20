<template>
  <div class="snack-search">
    <i class="fal fa-search"></i>
    <input @input="searchSnacks($event)" type="text">
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SnackSearch",
  methods: {
    ...mapActions(["getSnacks"]),
    searchSnacks(e) {
      console.log(e.target.value, this.getSnacks)
      this.getSnacks(e.target.value)
    }
  }
}
</script>

<style>

</style>
