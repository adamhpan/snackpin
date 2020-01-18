<template>
  <div class="home row">
    <div class="snack-bar col-sm-6 col-md-4">
      <div class="search-panel py-2 border-bottom border-top d-flex">
        <SnackSearch></SnackSearch>
        <button>Show Saved</button>
      </div>
      <SnackList></SnackList>
    </div>
    <div class="col-md-8 h-100">
      <SnackMap></SnackMap>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import SnackList from "~/components/SnackList"
import SnackSearch from "~/components/SnackSearch"
import SnackMap from "~/components/SnackMap"

export default {
  components: {
    Logo,
    SnackList,
    SnackSearch,
    SnackMap
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
