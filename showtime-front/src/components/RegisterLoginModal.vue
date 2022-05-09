<template>
  <div id="fake-nav">
    <a href="#register" @click="open('register', $event)">Register</a>
    <a href="#login" @click="open('login', $event)">Login</a>
  </div>
  <div
    class="user-modal-container"
    :class="{ active: active }"
    id="login-modal"
    @click="close"
  >
    <div class="user-modal">
      <ul class="form-switcher">
        <li @click="flip('register', $event)">
          <a href="" id="register-form">Register</a>
        </li>
        <li @click="flip('login', $event)">
          <a href="" id="login-form">Login</a>
        </li>
      </ul>
      <div
        class="form-register"
        :class="{ active: active == 'register' }"
        id="form-register"
      >
        <div class="error-message" v-text="registerError"></div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          v-model="registerName"
          @keyup.enter="submit('register', $event)"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          v-model="registerEmail"
          @keyup.enter="submit('register', $event)"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          v-model="registerPassword"
          @keyup.enter="submit('register', $event)"
        />
        <input
          type="submit"
          :class="{ disabled: submitted == 'register' }"
          @click="submit('register', $event)"
          v-model="registerSubmit"
          id="registerSubmit"
        />
        <div class="links">
          <a href="" @click="flip('login', $event)">Already have an account?</a>
        </div>
      </div>
      <div
        class="form-login"
        :class="{ active: active == 'login' }"
        id="form-login"
      >
        <div class="error-message" v-text="loginError"></div>
        <input
          type="text"
          name="user"
          placeholder="Email or Username"
          v-model="loginUser"
          @keyup.enter="submit('login', $event)"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          v-model="loginPassword"
          @keyup.enter="submit('login', $event)"
        />
        <input
          type="submit"
          :class="{ disabled: submitted == 'login' }"
          @click="submit('login', $event)"
          v-model="loginSubmit"
          id="loginSubmit"
        />
        <div class="links">
          <a href="" @click="flip('password', $event)">Forgot your password?</a>
        </div>
      </div>
      <div
        class="form-password"
        :class="{ active: active == 'password' }"
        id="form-password"
      >
        <div class="error-message" v-text="passwordError"></div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          v-model="passwordEmail"
          @keyup.enter="submit('password', $event)"
        />
        <input
          type="submit"
          :class="{ disabled: submitted == 'password' }"
          @click="submit('password', $event)"
          v-model="passwordSubmit"
          id="passwordSubmit"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RegisterLoginModal",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
<style>
.user-modal-container * {
  box-sizing: border-box;
}

.user-modal-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  overflow-y: auto;
  z-index: 3;
  font-family: "Lato", "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
  font-size: 14px;
  background-color: rgba(17, 17, 17, 0.9);
  -webkit-transition: all 0.25s linear;
  -moz-transition: all 0.25s linear;
  -o-transition: all 0.25s linear;
  -ms-transition: all 0.25s linear;
  transition: all 0.25s linear;
}

.user-modal-container.active {
  opacity: 1;
  visibility: visible;
}

.user-modal-container .user-modal {
  position: relative;
  margin: 50px auto;
  width: 90%;
  max-width: 500px;
  background-color: #f6f6f6;
  cursor: initial;
}

.user-modal-container .form-login,
.user-modal-container .form-register,
.user-modal-container .form-password {
  padding: 75px 25px 25px;
  display: none;
}

.user-modal-container .form-login.active,
.user-modal-container .form-register.active,
.user-modal-container .form-password.active {
  display: block;
}

.user-modal-container ul.form-switcher {
  margin: 0;
  padding: 0;
}

.user-modal-container ul.form-switcher li {
  list-style: none;
  display: inline-block;
  width: 50%;
  /* float: left; */
  margin: 0;
}

.user-modal-container ul.form-switcher li a {
  width: 100%;
  display: block;
  height: 50px;
  line-height: 50px;
  color: #666666;
  background-color: #dddddd;
  text-align: center;
}

.user-modal-container ul.form-switcher li a.active {
  color: #000000;
  background-color: #f6f6f6;
}

.user-modal-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #eeeeee;
}

.user-modal-container input[type="submit"] {
  color: #f6f6f6;
  border: 0;
  margin-bottom: 0;
  background-color: #3fb67b;
  cursor: pointer;
}

.user-modal-container input[type="submit"]:hover {
  background-color: #3aa771;
}

.user-modal-container input[type="submit"]:active {
  background-color: #379d6b;
}

.user-modal-container .links {
  text-align: center;
  padding-top: 25px;
}

.user-modal-container .links a {
  color: #3fb67b;
}

.user-modal-container input[type="submit"].disabled {
  background-color: #98d6b7;
}
</style>
