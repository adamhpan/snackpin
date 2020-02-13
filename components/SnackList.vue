<template>
  <div class="snack-list" id="snack-list">
    <div
      class="snack border-top border-bottom py-2"
      v-for="snack in mapSnacks"
      :id="'snack-scroll-' + snack.id"
      :class="{
        hover: activeSnack == snack,
        'outside-map-bounds': !snack.withinMapBounds
      }"
      :key="snack.id"
      @mouseenter="setActiveSnack(snack)"
    >
      <div class="col-sm-12">
        <div>
          <b>{{snack.name}}</b>
          <p>
            {{snack.address}}
          </p>
        </div>
        <div
          class="row"
          v-for="reaction in snack.reactions"
          :key="reaction.id"
        >
          <div class="col-sm-4 pr-0">
            <img :src="reaction.thumbnail" class="w-100" alt=""/>
          </div>
          <div class="col-sm-8">
            <b>{{reaction.name}}</b>
            <p v-html="reaction.description"></p>
          </div>
          <div
            @click="_toggleSavedSnack(snack)"
            class="favorite pr-2"
            >
            <i
              class="fa-heart"
              :class="{ far: !snack.saved, fas: snack.saved, 'text-danger': snack.saved }"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <p class="pt-4 text-center" v-if="!mapSnacks.length">There isn't anything in this area.</p>
  </div>
</template>

<script>
import SnackSearch from "~/components/SnackSearch";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  // Note: data neds to be a function, not obj
  name: "SnackList",
  components: {
    SnackSearch
  },
  computed: {
    ...mapGetters(["mapSnacks", "activeSnack", "user"])
  },
  methods: {
    ...mapMutations(["setActiveSnack"]),
    ...mapActions(["toggleSavedSnack"]),
    _toggleSavedSnack(snack) {
      this.toggleSavedSnack(snack);
    }
  },
}
</script>

<style lang="scss" scoped>
  .snack-list {
    height: calc(100% - 112px);
    overflow-y: scroll;
  }

  .snack {
    position: relative;
  }

  .snack.hover {
    background-color: rgba(255, 166, 0, 0.055);
  }

  .snack .favorite {
    position: absolute;
    right: 0;
    top: 0;

    :hover {
      cursor: pointer;
    }
  }

  .outside-map-bounds {
    opacity: 0.4;
  }
</style>
