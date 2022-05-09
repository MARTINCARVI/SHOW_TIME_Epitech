<template>
  <div class="conteneur-concerts">
    <h1>{{ concert.title }}</h1>
    <h3>{{ concert.place }}</h3>
    <h4>{{ concert.date }}</h4>
    <h5>{{ concert.price }}€TTC</h5>

    <button v-on:click="AddConcertToFavorite" v-if="isLog">
      Add to favorite
    </button>
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "ConcertCard",
  props: { concert: Object },
  data() {
    return { store: useStore() };
  },
  computed: {
    users: function () {
      return this.store.getters.getUsers;
    },
    userConnected: function () {
      return this.store.getters.getUserConnected;
    },
    isLog: function () {
      return this.store.getters.getIsLogged;
    },
  },
  mounted() {
    this.store.dispatch("getAllUsers");
  },
  methods: {
    AddConcertToFavorite: async function () {
      console.log("CONCERT CHOISI: ", this.concert.title);
      console.log(
        "UTILISATEUR FAISANT LA DEMANDE:",
        this.userConnected?.username,
        this.userConnected?.id
      );
      this.store.dispatch("AddConcertToFavorite", {
        id: this.concert.id,
      });
    },
  },
};
</script>
<style></style>
