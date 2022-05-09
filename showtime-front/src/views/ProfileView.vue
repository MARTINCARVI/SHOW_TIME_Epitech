<template>
  <div class="about">
    <user-profile />
  </div>
  <div>
    <QRGenerator />
  </div>
</template>
<script>
import UserProfile from "@/components/UserProfile.vue";
import QRGenerator from "../components/QRGenerator.vue";
import { useStore } from "vuex";

export default {
  name: "ProfileView",
  components: {
    UserProfile,
    QRGenerator,
  },
  props: {},
  data() {
    return { store: useStore(), isLogged: Boolean };
  },
  computed: {
    isLog: function () {
      return this.store.getters.getIsLogged;
    },
  },
  mounted() {
    if (this.isLog === false) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {},
};
</script>
