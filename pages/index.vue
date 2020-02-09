<template>
  <div class="home row">
    <div class="snack-bar col-sm-6 col-md-4">
      <div class="search-panel py-2 border-bottom border-top d-flex">
        <SnackSearch></SnackSearch>
        <button class="btn" @click="showSaved">Show Saved</button>
      </div>
      <SnackList></SnackList>
    </div>
    <div class="col-md-8 h-80 p-0">
      <SnackMap></SnackMap>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import SnackList from "~/components/SnackList"
import SnackSearch from "~/components/SnackSearch"
import SnackMap from "~/components/SnackMap"

import { mapActions } from "vuex";

export default {
  components: {
    Logo,
    SnackList,
    SnackSearch,
    SnackMap
  },
  methods: {
    ...mapActions(["getUserSnacks"]),
    showSaved() {
      this.getUserSnacks()
    }
  }
}
</script>

<style lang="scss">
  .home {
    height: 100%;
  }

  .snack-bar {
    height: 100%;
    border-right: 1px $grey solid;
  }
</style>
