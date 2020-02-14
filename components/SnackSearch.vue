<template>
  <div class="snack-search">
    <div class="form-inline">
      <label class="pr-2" for="inputSearch">
        <i class="fal fa-search"></i>
      </label>
      <input @input="searchSnacks($event)" class="form-control" type="text" placeholder="Search feature soon!" disabled>
    </div>
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
