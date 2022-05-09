<template>
  <div v-if="isLog">
    <h1>Hello {{ userConnected?.username }}</h1>
    <br />
    <span>Your email: {{ userConnected?.email }}</span>
    <br />
    <button
      type="button"
      class="btn btn-primary m-2 fload-end"
      data-bs-toggle="modal"
      data-bs-target="#profilModal"
      @click="editProfilClick(user)"
    >
      Edit My Informations</button
    ><br />

    <div
      class="modal fade"
      id="profilModal"
      tabindex="-1"
      aria-labelleBy="profilModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="profilModalLabel">
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
              <input
                type="text"
                class="form-control"
                v-model="this.userConnected.email"
                required
              />
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text">Password</span>
                <input
                  type="text"
                  class="form-control"
                  v-model="this.userConnected.password"
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
                  @click="updateProfil(id)"
                  v-if="id != 0"
                  class="btn btn_primary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Update My informations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3>Favorite concerts:</h3>
    <div
      v-for="(favorite, index) in userConnected?.favoritesConcert"
      :key="index"
    >
      <div class="favoris">
        <h4>{{ favorite.title }}</h4>
        {{ favorite.place }}
        {{ favorite.price }}€ TTC
        {{ favorite.date }}
      </div>
    </div>
    <h3>Favorite groups:</h3>
    <div
      v-for="(favorite, index) in userConnected?.favoritesGroup"
      :key="index"
    >
      {{ favorite }}
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "UserProfile",
  components: {},
  props: {
    user: Object,
  },
  data() {
    return {
      store: useStore(),
      isLogged: Boolean,
      modalTitle: "EDIT MY INFORMATIONS",
      id: this.id,
      // email: this.userConnected.email,
      password: this.password,
      confirm_password: "",
    };
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
    editProfilClick(user) {
      this.modalTitle = "EDIT MY INFORMATIONS";
      this.id = user.id;
      this.username = user.username;
      this.email = user.email;
      this.password = user.password;
      this.confirm_password = user.confirm_password;
      this.picture = user.picture;
    },
    updateProfil: async function (id) {
      this.store.dispatch("updateProfil", {
        id: id,
        email: this.userConnected.email,
        username: this.userConnected.username,
        password: this.userConnected.password,
        picture: this.userConnected.picture,
      });
    },
  },
};
</script>
