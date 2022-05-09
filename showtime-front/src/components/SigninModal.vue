<template>
  <button
    type="button"
    class="btn btn-primary m-2 fload-end"
    data-bs-toggle="modal"
    data-bs-target="#loginUserModal"
    @click="openModal()"
  >
    SIGN-IN Please
  </button>
  <div
    class="modal fade"
    id="loginUserModal"
    tabindex="-1"
    aria-labelleBy="loginUserModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginUserModalLabel">
            {{ modalTitle }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text">Email</span>
            <input type="text" class="form-control" v-model="email" required />
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text">Password</span>
              <input
                type="text"
                class="form-control"
                v-model="password"
                required
              />
            </div>
            <button
              type="button"
              v-on:click="loginUser(user)"
              v-if="id == 0"
              class="btn btn_primary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "SigninModal",
  components: {},
  props: {},
  data() {
    return {
      store: useStore(),
      modalTitle: "",
      id: 0,
      email: "",
      password: "",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    openModal(user) {
      this.modalTitle = "SIGN-IN";
      this.id = user.id;
      this.email = user.email;
      this.password = user.password;
    },

    loginUser: async function () {
      this.store.dispatch("loginUser", {
        email: this.email,
        password: this.password,
        redirectCallback: this.redirectCallbackHome,
      });
    },
    redirectCallbackHome: async function () {
      this.$router.push({ name: "home" });
    },
  },
};
</script>
