<template>
  <!-- <div>
    <SignupModal />
  </div>
  <div>
    <SigninModal />
  </div> -->
  <div class="home">
    <search-bar class="search-bar-container" />

    <div v-for="(concert, index) in concerts" :key="index">
      <concert-card :concert="concert" />
    </div>
  </div>
</template>

<script>
// import SignupModal from "../components/SignupModal.vue";
// import SigninModal from "../components/SigninModal.vue";
import SearchBar from "../components/SearchBar.vue";
import ConcertCard from "../components/ConcertCard.vue";

import { useStore } from "vuex";
export default {
  name: "HomeView",
  components: { ConcertCard, SearchBar },

  props: {},
  data() {
    return { store: useStore(), isLogged: Boolean };
  },
  computed: {
    users: function () {
      return this.store.getters.getUsers;
    },
    groups: function () {
      return this.store.getters.getGroups;
    },
    concerts: function () {
      return this.store.getters.getConcerts;
    },
    categories: function () {
      return this.store.getters.getCategories;
    },
    isLog: function () {
      return this.store.getters.getIsLogged;
    },
  },
  mounted() {
    this.store.dispatch("getAllConcerts");
  },
  methods: {},
};
</script>
