<template>
  <div class="cover_picture">
    <img class="card-image" :src="group.cover_picture" />
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "PictureCard",
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
  margin-top: 30px;
}
.card-content {
  margin-top: 10px;
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
  max-width: 1200px;
  align-items: center;
  grid-template-columns: 2fr 1fr;
  display: grid;
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 0px;
  margin-bottom: 100px;
  border-radius: 10px;
  min-height: 500px;
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
