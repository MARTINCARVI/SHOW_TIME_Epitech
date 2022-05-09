<template>
  <!-- <h4>CATEGORY CRUD</h4>-->
  <div>
    <CrudUser />
  </div>
  <div>
    <CrudConcert />
  </div>
  <div>
    <CrudGroup />
  </div>
  <div>
    <CrudCategory />
  </div>
</template>
<script>
import CrudUser from "../components/CrudUser.vue";
import CrudConcert from "../components/CrudConcert.vue";
import CrudGroup from "../components/CrudGroup.vue";
import CrudCategory from "../components/CrudCategory.vue";
import { useStore } from "vuex";
export default {
  name: "AdminView",
  components: {
    CrudUser,
    CrudConcert,
    CrudGroup,
    CrudCategory,
  },
  props: {
    user: Object,
    group: Object,
    concert: Object,
    category: Object,
    index: String,
  },
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
    if (this.isLog === false) {
      this.$router.push({ name: "login" });
    }
    this.store.dispatch("getAllUsers");
    this.store.dispatch("getAllConcerts");
    this.store.dispatch("getAllGroups");
    this.store.dispatch("getAllCategories");
  },
  methods: {
    // USER
    createUser: async function () {
      this.store.dispatch("createUser", {
        email: this.email,
        username: this.username,
        password: this.password,
        picture: this.picture,
        group_id: this.group_id,
        concert_id: this.concert_id,
        isAdmin: this.isAdmin,
      });
    },
    deleteUser: async function (id) {
      this.store.dispatch("deleteUser", { id });
    },
    updateUser: async function (id) {
      this.store.dispatch("updateUser", {
        id,
        email: this.email,
        username: this.username,
        password: this.password,
        picture: this.picture,
        group_id: this.group_id,
        concert_id: this.concert_id,
        isAdmin: this.isAdmin,
      });
    },
    // CONCERT
    createConcert: async function () {
      this.store.dispatch("createConcert", {
        title: this.title,
        place: this.place,
        group_id: this.group_id,
        price: this.price,
        date: this.date,
      });
    },
    deleteConcert: async function (id) {
      this.store.dispatch("deleteConcert", { id });
    },
    updateConcert: async function (id) {
      this.store.dispatch("updateConcert", {
        id: id,
        title: this.title,
        place: this.place,
        group_id: this.group_id,
        price: this.price,
        date: this.date,
      });
    },
    // GROUPS
    createGroup: async function () {
      this.store.dispatch("createGroup", {
        name: this.name,
        description: this.description,
        cover_picture: this.cover_picture,
        category_id: this.category_id,
      });
    },
    deleteGroup: async function (id) {
      this.store.dispatch("deleteGroup", { id });
    },
    updateGroup: async function (id) {
      this.store.dispatch("updateGroup", {
        id: id,
        name: this.name,
        description: this.description,
        cover_picture: this.cover_picture,
        category_id: this.category_id,
      });
    },
    // CATEGORIES
    createCategory: async function () {
      this.store.dispatch("createCategory", {
        name: this.name,
      });
    },
    deleteCategory: async function (id) {
      this.store.dispatch("deleteCategory", { id });
    },
    updateCategory: async function (id) {
      this.store.dispatch("updateCategory", {
        id: id,
        name: this.name,
      });
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  height: fit-content;
  max-height: 100vh;
  margin: 0 auto;
  overflow-y: auto;
}
</style>
