<template>
  <div class="favorite-toast">
    <div class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" :v-html="toastMsg">
        <div class="toast-header">
          <strong class="mr-auto">You need to be <nuxt-link to="login">logged in</nuxt-link> to save snacks</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  methods: {
    ...mapMutations(["toast"])
  },
  computed: {
    ...mapGetters(["toastMsg"])
  },
  watch: {
    toastMsg(newValue, oldValue) {
      if(newValue) {
        $('.toast').toast("show")
        this.toast("");
      }
    }
  },
  mounted() {
    $('.toast').toast({
      delay: 2000,
      autohide: true
    })
  }
}
</script>

<style>
  .favorite-toast {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .toast {
    margin: 8px auto;
  }
</style>
