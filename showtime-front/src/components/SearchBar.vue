<template>
  <div class="search-bar">
    <input type="text" placeholder="search" v-model="search" required />
    <button v-on:click="searchConcerts">Search</button>
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "SearchBar",
  components: {},
  props: {},
  data() {
    return { store: useStore(), search: "" };
  },
  computed: {},
  mounted() {},
  methods: {
    searchConcerts: async function () {
      console.log("SEARCH!", this.search);
      this.store.dispatch("searchConcerts", {
        search: this.search,
      });
    },
  },
};
</script>
