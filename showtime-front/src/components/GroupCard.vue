<template>
  <div class="conteneur">
    <div class="gauche">
      <div class="cover_picture">
        <img class="card-image" :src="group.cover_picture" />
      </div>
    </div>
    <div class="droite">
      <div>
        <h1 class="card-title">{{ group.name }}</h1>
      </div>
      <div class="card-content">{{ group.description }}</div>
      <button v-on:click="AddGroupToFavorite" v-if="isLog">
        Add to favorite
      </button>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "GroupCard",
  components: {},
  props: { group: Object },
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
    AddGroupToFavorite: async function () {
      console.log("GROUP CHOISI: ", this.group.id);
      console.log(
        "UTILISATEUR FAISANT LA DEMANDE:",
        this.userConnected?.username,
        this.userConnected?.id
      );
      this.store.dispatch("AddGroupToFavorite", {
        id: this.group.id,
      });
    },
  },
};
</script>
<style scoped>
.bigconteneur {
  display: block;
  max-width: 100%;
}
.card-title {
  font-size: auto;
}
.card-image {
  width: 400px;
  height: 400px;
  border-radius: 10px;
}
.gauche {
  width: 100%;
  height: auto;
  align-items: center;
  text-align: center;
}
.droite {
  width: 100%;
  height: auto;
  align-items: center;
  text-align: center;
}
.conteneur {
  display: block;

  align-items: center;
  grid-template-columns: 1.5fr 1fr;
  display: grid;
  margin-top: 0px;
  border-radius: 10px;
  min-height: 420px;
}
@media (max-width: 800px) {
  .conteneur {
    align-items: center;
    grid-template-columns: 1fr;
    display: grid;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid;
    border-radius: 10px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}
/*
.card-list {
  align-items: center;
  border: 2px solid;
  display: flex;
  height: auto;
}
.card-image {
  max-width: 50%;
}

}*/
</style>
