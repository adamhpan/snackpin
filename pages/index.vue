<template>
  <div class="home row">
    <div class="snack-bar col-sm-6 col-md-4 p-0">
      <div class="search-panel p-2 border-bottom border-top d-flex justify-content-between">
        <SnackSearch></SnackSearch>
        <button class="btn btn-warning text-white" @click="toggleSavedSnacks" v-if="!showingSavedSnacks">Show Saved</button>
        <button class="btn btn-warning text-white" @click="toggleSavedSnacks" v-if="showingSavedSnacks">Show All</button>
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

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Logo,
    SnackList,
    SnackSearch,
    SnackMap
  },
  computed: {
    ...mapGetters(["user", "showingSavedSnacks"])
  },
  methods: {
    ...mapMutations(["setShowingSavedSnacks"]),
    ...mapActions(["showSavedSnacks", "getMapSnacks", "toast"]),
    toggleSavedSnacks() {
      if(!this.user) {
        this.toast(`<div>You need to be <a href='/login'">logged in</a> to see your saved snacks</div>`);
        return;
      }

      this.setShowingSavedSnacks(!this.showingSavedSnacks);

      if(this.showingSavedSnacks) {
        this.showSavedSnacks();
      } else {
        this.getMapSnacks();
      }
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
