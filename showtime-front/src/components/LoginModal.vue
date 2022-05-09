<template>
  <div class="log-reg">
    <div>Please Login !</div>
    <input type="text" placeholder="email" v-model="email" required />
    <input type="password" placeholder="password" v-model="password" required />
    <button v-on:click="loginUser">Login</button>
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "LoginModal",
  components: {},
  props: {},
  data() {
    return { store: useStore() };
  },
  computed: {},
  mounted() {},
  methods: {
    loginUser: async function () {
      this.store.dispatch("loginUser", {
        email: this.email,
        password: this.password,
        redirectCallback: this.redirectCallback,
      });
    },
    redirectCallback: async function () {
      this.$router.push({ name: "home" });
    },
  },
};
</script>
