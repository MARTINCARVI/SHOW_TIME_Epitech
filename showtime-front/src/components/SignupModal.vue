<template>
  <button
    type="button"
    class="btn btn-primary m-2 fload-end"
    data-bs-toggle="modal"
    data-bs-target="#newUserModal"
    @click="addNewUserClick()"
  >
    SIGN-UP Please
  </button>

  <div
    class="modal fade"
    id="newUserModal"
    tabindex="-1"
    aria-labelleBy="newUserModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newUserModalLabel">
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
            <span class="input-group-text">Username</span>
            <input
              type="text"
              class="form-control"
              v-model="username"
              required
            />
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text">Email</span>
              <input
                type="text"
                class="form-control"
                v-model="email"
                required
              />
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
              <div class="modal-body">
                <div class="input-group mb-3">
                  <span class="input-group-text">Confirm_password</span>
                  <input type="text" class="form-control" required />
                </div>
                <button
                  type="button"
                  @click="registerUser()"
                  v-if="id == 0"
                  class="btn btn_primary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "SignupModal",
  components: {},
  props: {},
  data() {
    return {
      store: useStore(),
      modalTitle: "",
      username: "",
      id: 0,
      email: "",
      password: "",
      confirm_password: "",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    addNewUserClick() {
      this.modalTitle = "SIGN-UP";
      this.id = 0;
      this.username = "";
      this.email = "";
      this.password = "";
      this.confirm_password = "";
    },
    loginUserClick(user) {
      this.modalTitle = "SIGN-IN";
      this.id = user.id;
      this.email = user.email;
      this.password = user.password;
    },
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
