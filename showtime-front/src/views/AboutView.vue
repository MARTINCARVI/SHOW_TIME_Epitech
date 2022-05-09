<template>
  <div class="about">
    <div v-for="(group, index) in groups" :key="index">
      <group-card :group="group" />
    </div>
  </div>
</template>
<script>
import GroupCard from "../components/GroupCard.vue";
import { useStore } from "vuex";
export default {
  name: "AboutView",
  components: { GroupCard },

  props: {},
  data() {
    return { store: useStore() };
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
    this.store.dispatch("getAllGroups");
  },
  methods: {},
};
</script>
