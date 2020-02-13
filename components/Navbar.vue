<template>
  <nav class="navbar navbar-expand-sm">
    <a href="/" class="navbar-brand text-warning">
      <i class="fas fa-ice-cream"></i>
      Snackpin
    </a>

    <ul class="navbar-nav ml-auto">
      <li v-if="this.user" class="nav-item">
        <a href="/" class="nav-link" @click="logout">Logout</a>
      </li>
      <li v-if="!this.user" class="nav-item active">
        <nuxt-link class="nav-link" to="login">Login</nuxt-link>
      </li>
      <li v-if="!this.user" class="nav-item">
        <nuxt-link class="nav-link" to="signup">Signup</nuxt-link>
      </li>
      <li class="nav-item pl-3">
        <button class="btn btn-danger" data-toggle="modal" data-target="#feedback-modal">Feedback</button>
      </li>
    </ul>

    <div id="feedback-modal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Feedback</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit="sendFeedback">
            <div class="modal-body">
              <div class="form-group">
                <label for="">What's up?</label>
                <select class="form-control" v-model="feedbackType" required>
                  <option>I want a new feature</option>
                  <option>My youtuber/video is missing</option>
                  <option>I found a bug</option>
                </select>
              </div>
              <div class="form-group">
                <label for="">Details</label>
                <textarea v-model="feedback" class="form-control" rows="3" required></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Send feedback</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      feedbackType: "",
      feedback: ""
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["logout", "toast"]),
    async sendFeedback(e) {
      axios.post("/api/feedback", {
        feedbackType: this.feedbackType,
        feedback: this.feedback
      });

      $('#feedback-modal').modal('hide');
      this.toast("Thanks for your feedback!");
      this.feedbackType = "";
      this.feedback = "";

      e.preventDefault();
    }
  }
}
</script>

<style>

</style>
