<template>
  <h2>Crud Users</h2>

  <button
    type="button"
    class="btn btn-primary m-2 fload-end"
    data-bs-toggle="modal"
    data-bs-target="#userModal"
    @click="addUserClick()"
  >
    Add User
  </button>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          <th>Picture</th>
          <th>Group_id</th>
          <th>Concert_id</th>
          <th>isAdmin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>*******</td>
          <td>{{ user.picture }}</td>
          <td>{{ user.group_id }}</td>
          <td>{{ user.concert_id }}</td>
          <td>{{ user.isAdmin }}</td>
          <td>
            <button
              type="button"
              class="btn btn-light mr-1"
              data-bs-toggle="modal"
              data-bs-target="#userModal"
              @click="editUserClick(user)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
            <button
              type="button"
              class="btn btn-light mr-1"
              v-on:click="deleteUser(user.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="userModal"
      tabindex="-1"
      aria-labelleBy="userModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">{{ modalTitle }}</h5>
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

            <div class="input-group mb-3">
              <span class="input-group-text">Email</span>
              <input
                type="text"
                class="form-control"
                v-model="email"
                required
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Password</span>
              <input
                type="text"
                class="form-control"
                v-model="password"
                required
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Confirm password</span>
              <input
                type="text"
                class="form-control"
                v-model="confirm_password"
                required
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Picture</span>
              <input
                type="text"
                class="form-control"
                v-model="picture"
                required
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Group_id</span>
              <input
                type="text"
                class="form-control"
                v-model="group_id"
                required
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Concert_id</span>
              <input
                type="text"
                class="form-control"
                v-model="concert_id"
                required
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">IsAdmin</span>
              <input
                type="text"
                class="form-control"
                v-model="isAdmin"
                required
              />
            </div>

            <button
              type="button"
              @click="createUser()"
              v-if="id == 0"
              class="btn btn_primary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Create User
            </button>
            <button
              type="button"
              v-on:click="updateUser(id)"
              v-if="id != 0"
              class="btn btn_primary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Update User
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import UserList from "@/components/UserList.vue";
// import { getAllUsers } from "@/store/index.js";
// import { addUser, deleteUser, updateUser } from "@/api.js";
// import axios from "axios";
import { useStore } from "vuex";
export default {
  name: "CrudUser",
  components: {
    // UserList,
  },
  props: {
    user: Object,
  },
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
  computed: {
    users: function () {
      return this.store.getters.getUsers;
    },
  },
  mounted() {
    this.store.dispatch("getAllUsers");
  },
  methods: {
    addUserClick() {
      this.modalTitle = "ADD USER";
      this.id = 0;
      this.username = "";
      this.email = "";
      this.password = "";
      this.confirm_password = "";
      this.picture = "";
      this.group_id = "";
      this.concert_id = "";
      this.isAdmin = "";
    },
    editUserClick(user) {
      this.modalTitle = "EDIT USER";
      this.id = user.id;
      this.username = user.username;
      this.email = user.email;
      this.password = user.password;
      this.confirm_password = user.confirm_password;
      this.picture = user.picture;
      this.group_id = user.group_id;
      this.concert_id = user.concert_id;
      this.isAdmin = user.isAdmin;
    },
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
        id: id,
        email: this.email,
        username: this.username,
        password: this.password,
        picture: this.picture,
        group_id: this.group_id,
        concert_id: this.concert_id,
        isAdmin: this.isAdmin,
      });
    },
  },
};

//

// deleteUser(id) {
//   if (!confirm("Are you sur?")) {
//     return;
//   }
//   console.log(id);
//   deleteUser(id);
//   this.getAllUsers();
// },
</script>

<style></style>
