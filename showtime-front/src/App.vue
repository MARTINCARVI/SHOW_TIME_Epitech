<template>
  <NavBar />
  <nav>
    <router-link to="/">Concerts</router-link>
    <router-link to="/about">Groups</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/login">Login </router-link>
    <router-link to="/profile" v-if="isLog"
      >Profil {{ userConnected?.username }}
    </router-link>
    <router-link to="/auth" v-if="isLog">Admin </router-link>
    <router-link to="/home" v-on:click="logOutUser">Logout </router-link>
  </nav>
  <router-view />
</template>
<script>
import NavBar from "./components/NavBar.vue";
// import FooterBar from "./components/FooterBar.vue";
import { useStore } from "vuex";
export default {
  name: "UserProfile",
  components: { NavBar },
  props: {},
  data() {
    return { store: useStore(), isLogged: Boolean };
  },
  computed: {
    userConnected: function () {
      return this.store.getters.getUserConnected;
    },
    isLog: function () {
      return this.store.getters.getIsLogged;
    },
  },
  mounted() {},
  methods: {
    logOutUser: async function () {
      this.store.dispatch("logOutUser");
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
