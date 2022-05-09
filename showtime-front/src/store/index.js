import { createStore } from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";

export default createStore({
  state: {
    users: [],
    concerts: [],
    groups: [],
    categories: [],
    isLogged: false,
    access_token: null,
    user_connected: null,
  },
  getters: {
    getUsers: (state) => state.users,
    getConcerts: (state) => state.concerts,
    getGroups: (state) => state.groups,
    getCategories: (state) => state.categories,
    getIsLogged: (state) => state.isLogged,
    // getAccessToken: (state) => state.access_token,
    getUserConnected: (state) => state.user_connected,
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_CONCERTS(state, concerts) {
      state.concerts = concerts;
    },
    SET_GROUPS(state, groups) {
      state.groups = groups;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_ISLOGGED(state, isLogged) {
      state.isLogged = isLogged;
    },
    // SET_ACCESS_TOKEN(state, access_token) {
    //   state.access_token = access_token;
    // },
    SET_USER_CONNECTED(state, user_connected) {
      state.user_connected = user_connected;
    },
  },
  actions: {
    // TOKEN

    // USERS
    async getAllUsers({ commit }) {
      const url = "http://localhost:3000/users";
      const config = {
        method: "get",
        url,
        headers: {
          // var aValue = storage.getItem(keyName);
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
          "Access-Control-Allow-Origin": "*",
        },
      };
      try {
        const response = await axios(config);
        commit("SET_USERS", response.data);
      } catch (error) {
        return error;
      }
    },

    async registerUser(
      { dispatch },
      { username, email, password, redirectCallback }
    ) {
      const url = "http://localhost:3000/auth/register";
      var config = {
        method: "post",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {
          username: username,
          email: email,
          password: password,
        },
      };
      try {
        await axios(config);
        dispatch("getAllUsers");
        redirectCallback();
      } catch (error) {
        return error;
      }
    },

    async createUser(
      { dispatch },
      { username, email, password, picture, group_id, concert_id, isAdmin }
    ) {
      const url = "http://localhost:3000/auth/register";
      var config = {
        method: "post",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {
          username: username,
          email: email,
          password: password,
          picture,
          group_id,
          concert_id,
          isAdmin,
        },
      };
      try {
        await axios(config);
        dispatch("getAllUsers");
      } catch (error) {
        return error;
      }
    },

    async loginUser(
      { dispatch, commit },
      { email, password, redirectCallback }
    ) {
      const url = "http://localhost:3000/auth/login";
      var config = {
        method: "post",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {
          email: email,
          password: password,
        },
      };
      try {
        const response = await axios(config);
        dispatch("getAllUsers");
        const access_token = response.data.access_token;
        const user = response.data.user;
        const favorite_concert = response.data.user.favoritesConcert;
        localStorage.setItem("access_token", access_token);
        console.log("100", user, access_token, favorite_concert);

        commit("SET_ISLOGGED", true);
        commit("SET_USER_CONNECTED", {
          ...user,
          access_token,
          favorite_concert,
        });
        redirectCallback();
      } catch (error) {
        return error;
      }
    },
    async logOutUser({ commit }) {
      localStorage.removeItem("access_token");
      commit("SET_ISLOGGED", false);
      commit("SET_USER_CONNECTED", null);
      this.$router.push({ name: "home", query: { redirect: "/" } });
    },

    async deleteUser({ dispatch }, { id }) {
      const url = "http://localhost:3000/users/" + id;
      var config = {
        method: "delete",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {},
      };
      try {
        await axios(config);
        dispatch("getAllUsers");
      } catch (error) {
        return error;
      }
    },

    async updateUser(
      { dispatch },
      { id, email, username, password, picture, group_id, concert_id, isAdmin }
    ) {
      const url = "http://localhost:3000/users/" + id;
      console.log(id);
      var config = {
        method: "put",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {
          username: username,
          email: email,
          password: password,
          picture: picture,
          concert_id: concert_id,
          group_id: group_id,
          isAdmin: isAdmin,
        },
      };
      try {
        await axios(config);
        dispatch("getAllUsers");
      } catch (error) {
        return error;
      }
    },

    async AddConcertToFavorite({ commit, state }, { id }) {
      const access_token = localStorage.getItem("access_token");
      const url = "http://localhost:3000/users/favorite/concert/" + id;
      console.log(id);
      var config = {
        method: "post",
        url,
        headers: {
          Authorization: "Bearer " + access_token,
        },
        data: {},
      };
      try {
        const response = await axios(config);
        // const response_user = response.data.user;
        // const response_favorite_concert = response.data.user.favoritesConcert;
        const access_token = state.user_connected.access_token;
        const user_update = { ...response.data, access_token: access_token };
        commit("SET_USER_CONNECTED", user_update);
      } catch (error) {
        return error;
      }
    },

    async AddGroupToFavorite({ commit, state }, { id }) {
      const access_token = localStorage.getItem("access_token");
      const url = "http://localhost:3000/users/favorite/group/" + id;
      console.log(id);
      var config = {
        method: "post",
        url,
        headers: {
          Authorization: "Bearer " + access_token,
        },
        data: {},
      };
      try {
        const response = await axios(config);
        // const response_user = response.data.user;
        // const response_favorite_concert = response.data.user.favoritesConcert;
        const access_token = state.user_connected.access_token;
        const user_update = { ...response.data, access_token: access_token };
        commit("SET_USER_CONNECTED", user_update);
      } catch (error) {
        return error;
      }
    },

    // CONCERTS
    async getAllConcerts({ commit }) {
      const url = "http://localhost:3000/concerts";
      const config = {
        method: "get",
        url,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
          "Access-Control-Allow-Origin": "*",
        },
      };
      try {
        const response = await axios(config);
        commit("SET_CONCERTS", response.data);
      } catch (error) {
        return error;
      }
    },

    async createConcert({ dispatch }, { title, place, group_id, price, date }) {
      const url = "http://localhost:3000/concerts";
      var config = {
        method: "post",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {
          title: title,
          place: place,
          group_id: group_id,
          price: price,
          date: date,
        },
      };
      try {
        await axios(config);
        dispatch("getAllConcerts");
      } catch (error) {
        return error;
      }
    },
    async deleteConcert({ dispatch }, { id }) {
      const url = "http://localhost:3000/concerts/" + id;
      var config = {
        method: "delete",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {},
      };
      try {
        await axios(config);
        dispatch("getAllConcerts");
      } catch (error) {
        return error;
      }
    },
    async updateConcert(
      { dispatch },
      { id, title, place, group_id, price, date }
    ) {
      const url = "http://localhost:3000/concerts/" + id;
      console.log(id);
      var config = {
        method: "put",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {
          title: title,
          place: place,
          group_id: group_id,
          price: price,
          date: date,
        },
      };
      try {
        await axios(config);
        dispatch("getAllConcerts");
      } catch (error) {
        return error;
      }
    },
    async searchConcerts({ commit }, { search }) {
      const url = "http://localhost:3000/concerts/search?search=" + search;
      const config = {
        method: "get",
        url,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          search: search,
        },
      };
      try {
        const response = await axios(config);
        commit("SET_CONCERTS", response.data);
        // dispatch("getAllConcerts");
      } catch (error) {
        return error;
      }
    },
    // GROUPS
    async getAllGroups({ commit }) {
      const url = "http://localhost:3000/groups";
      const config = {
        method: "get",
        url,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
          "Access-Control-Allow-Origin": "*",
        },
      };
      try {
        const response = await axios(config);
        commit("SET_GROUPS", response.data);
      } catch (error) {
        return error;
      }
    },
    async createGroup(
      { dispatch },
      { name, description, cover_picture, category_id }
    ) {
      const url = "http://localhost:3000/groups";
      var config = {
        method: "post",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {
          name: name,
          description: description,
          cover_picture: cover_picture,
          category_id: category_id,
        },
      };
      try {
        await axios(config);
        dispatch("getAllGroups");
      } catch (error) {
        return error;
      }
    },
    async deleteGroup({ dispatch }, { id }) {
      const url = "http://localhost:3000/groups/" + id;
      var config = {
        method: "delete",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {},
      };
      try {
        await axios(config);
        dispatch("getAllGroups");
      } catch (error) {
        return error;
      }
    },
    async updateGroup(
      { dispatch },
      { id, name, description, cover_picture, category_id }
    ) {
      const url = "http://localhost:3000/groups/" + id;
      console.log(id);
      var config = {
        method: "put",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {
          name: name,
          description: description,
          cover_picture: cover_picture,
          category_id: category_id,
        },
      };
      try {
        await axios(config);
        dispatch("getAllGroups");
      } catch (error) {
        return error;
      }
    },
    // CATEGORIES
    async getAllCategories({ commit }) {
      const url = "http://localhost:3000/categories";
      const config = {
        method: "get",
        url,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
          "Access-Control-Allow-Origin": "*",
        },
      };
      try {
        const response = await axios(config);
        commit("SET_CATEGORIES", response.data);
      } catch (error) {
        return error;
      }
    },

    async createCategory({ dispatch }, { name }) {
      const url = "http://localhost:3000/categories";
      var config = {
        method: "post",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {
          name: name,
        },
      };
      try {
        await axios(config);
        dispatch("getAllCategories");
      } catch (error) {
        return error;
      }
    },
    async deleteCategory({ dispatch }, { id }) {
      const url = "http://localhost:3000/categories/" + id;
      var config = {
        method: "delete",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {},
      };
      try {
        await axios(config);
        dispatch("getAllCategories");
      } catch (error) {
        return error;
      }
    },
    async updateCategory({ dispatch }, { id, name }) {
      const url = "http://localhost:3000/categories/" + id;
      console.log(id);
      var config = {
        method: "put",
        url,
        headers: {
          Authorization: "Basic ZXBpdGVjaDpFcGl0ZWNoMTM=",
        },
        data: {
          name: name,
        },
      };
      try {
        await axios(config);
        dispatch("getAllCategories");
      } catch (error) {
        return error;
      }
    },
  },
  modules: {},
  plugins: [new VuexPersistence().plugin],
});
