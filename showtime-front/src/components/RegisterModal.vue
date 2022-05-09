<template>
  <div class="log-reg">
    <div>Please Register !</div>
    <input type="text" placeholder="username" v-model="username" required />
    <input type="text" placeholder="email" v-model="email" required />
    <input type="password" placeholder="password" v-model="password" required />
    <input type="password" placeholder="confirm password" required />
    <button v-on:click="registerUser">Register</button>
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "RegisterModal",
  components: {},
  props: {},
  data() {
    return { store: useStore() };
  },
  computed: {},
  mounted() {},
  methods: {
    registerUser: async function () {
      console.log(this.username, this.email, this.password);
      this.store.dispatch("registerUser", {
        username: this.username,
        email: this.email,
        password: this.password,
        redirectCallback: this.redirectCallback,
      });
    },
    redirectCallback: async function () {
      this.$router.push({ name: "login" });
    },
  },
};
</script>
