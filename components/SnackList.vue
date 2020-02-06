<template>
  <div class="snack-list">
    <div
      class="row snack border-top border-bottom py-2 px-0"
      v-for="snack in mapSnacks"
      :key="snack.id"
      @mouseenter="setActiveSnack(snack)"
    >
      <div class="col-sm-12">
        <div class="row">
          <div>
            <b>{{snack.name}}</b>
            <p>
              {{snack.address}}
            </p>
          </div>
        </div>
        <div
          class="row"
          v-for="reaction in snack.reactions"
          :key="reaction.id"
        >
          <img :src="reaction.thumbnail" class="col-sm-4 p-0" alt=""/>
          <div class="col-sm-8">
            <b>{{reaction.name}}</b>
            <p v-html="reaction.description"></p>
          </div>
        </div>
      </div>
      <div
        @click="toggleFavorite(snack)"
        class="favorite pr-2">
        <i class="far fa-heart"></i>
      </div>
    </div>
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
    ...mapGetters(["mapSnacks"])
  },
  methods: {
    ...mapMutations(["setActiveSnack"]),
    ...mapActions(["toggleFavorite"])
  },
  created() {
  },
  async fetch({store}) {
  }
}
</script>

<style lang="scss">
  .snack-list {
    min-height: 100%;
  }

  .snack {
    position: relative;
  }

  .snack .favorite {
    position: absolute;
    right: 0;
  }
</style>
