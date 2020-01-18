<template>
  <div class="snack-list">
    <div class="row snack border-top border-bottom py-2 px-0" v-for="snack in snacks" :key="snack.id">
      <div class="col-sm-12">
        <div class="row">
          <div>
            <b>{{snack.name}}</b>
            <p>
              {{snack.address}}
            </p>
          </div>
        </div>
        <div class="row" v-for="reaction in snack.reactions" :key="reaction.id">
          <img :src="reaction.thumbnail" class="col-sm-4 p-0" alt=""/>
          <div class="col-sm-8">
            <b>{{reaction.name}}</b>
            <p>{{reaction.description}}</p>
          </div>
        </div>
      </div>
      <div class="favorite pr-2">
        <i class="far fa-heart"></i>
      </div>
    </div>
  </div>
</template>

<script>
import SnackSearch from "~/components/SnackSearch";

export default {
  name: "SnackList",
  components: {
    SnackSearch
  },
  data: function() {
    return {
      snacks: [{
        id: 1,
        name: "Fresh Prints",
        address: "1234 broadway",
        reactions: [{
          id: 1,
          name: "Worth It",
          thumbnail: "http://i.ytimg.com/vi/ieAtWSh2i_Q/maxresdefault.jpg",
          description: "Rating - $$$"
        }]
      }, {
        id: 2,
        name: "Fresh Prints",
        address: "1234 broadway",
        reactions: [{
          id: 1,
          name: "Worth It",
          thumbnail: "http://i.ytimg.com/vi/ieAtWSh2i_Q/maxresdefault.jpg",
          description: "Rating - $$$"
        }]
      }]
    }
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
