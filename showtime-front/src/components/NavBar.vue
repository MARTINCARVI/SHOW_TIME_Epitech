<template>
  <div class="burgerandcategory">
    <div class="burger">
      <div ref="sideNav" class="bm-menu">
        <nav class="bm-item-list">
          <!-- side === 'right' ? true : false -->
          <!-- <component :is="currentMenu" :right="true"> -->
          <div class="divclasse">
            <nav class="nav-normal">
              <router-link to="/">Concerts</router-link> <br /><br />
              <router-link to="/about">Groups</router-link><br /><br />
              <router-link to="/profile"
                >Profil {{ userConnected?.username }}</router-link
              ><br /><br />
              <router-link to="/auth">Admin</router-link><br /><br />
              <router-link to="/home" v-on:click="logOutUser"
                >Logout
              </router-link>
              <div><Sign-in /><br /><br /></div>
              <Sign-up /><br />
              <!-- <router-link to="/admin">Admin</router-link><br /> -->
            </nav>
          </div>
          <!-- </component> -->
        </nav>

        <span
          class="bm-cross-button cross-style"
          @click="closeMenu"
          :class="{ hidden: !crossIcon }"
        >
          <span
            v-for="(x, index) in 2"
            :key="x"
            class="bm-cross"
            :style="{
              position: 'absolute',
              width: '3px',
              height: '14px',
              transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)',
            }"
          >
          </span>
        </span>
      </div>

      <div
        ref="bmBurgerButton"
        class="bm-burger-button"
        @click="openMenu"
        :class="{ hidden: !burgerIcon }"
      >
        <span
          class="bm-burger-bars line-style"
          :style="{ top: 20 * (index * 2) + '%' }"
          v-for="(x, index) in 3"
          :key="index"
        ></span>
      </div>
    </div>

    <!-- debut code anass -->
  </div>
  <!-- fin code anass -->
</template>
<script>
export default {
  name: "NavBar",
  components: {},
  data() {
    return {
      isSideBarOpen: false,
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false,
    },
    right: {
      type: Boolean,
      required: false,
    },
    width: {
      type: [String],
      required: false,
      default: "300",
    },
    disableEsc: {
      type: Boolean,
      required: false,
    },
    noOverlay: {
      type: Boolean,
      required: false,
    },
    onStateChange: {
      type: Function,
      required: false,
    },
    burgerIcon: {
      type: Boolean,
      required: false,
      default: true,
    },
    crossIcon: {
      type: Boolean,
      required: false,
      default: true,
    },
    disableOutsideClick: {
      type: Boolean,
      required: false,
      default: false,
    },
    closeOnNavigation: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    openMenu() {
      this.$emit("openMenu");
      this.isSideBarOpen = true;
      if (!this.noOverlay) {
        document.body.classList.add("bm-overlay");
      }
      if (this.right) {
        this.$refs.sideNav.style.left = "auto";
        this.$refs.sideNav.style.right = "0px";
      }
      this.$nextTick(function () {
        this.$refs.sideNav.style.width = this.width
          ? this.width + "px"
          : "300px";
      });
    },
    closeMenu() {
      this.$emit("closeMenu");
      this.isSideBarOpen = false;
      document.body.classList.remove("bm-overlay");
      this.$refs.sideNav.style.width = "0px";
    },
    closeMenuOnEsc(e) {
      e = e || window.event;
      if (e.key === "Escape" || e.keyCode === 27) {
        this.closeMenu();
      }
    },
    documentClick(e) {
      let element = this.$refs.bmBurgerButton;
      let target = null;
      if (e && e.target) {
        target = e.target;
      }
      if (
        element &&
        element !== target &&
        !element.contains(target) &&
        !this.hasClass(target, "bm-menu") &&
        this.isSideBarOpen &&
        !this.disableOutsideClick
      ) {
        this.closeMenu();
      } else if (
        element &&
        this.hasClass(target, "bm-menu") &&
        this.isSideBarOpen &&
        this.closeOnNavigation
      ) {
        this.closeMenu();
      }
    },
    hasClass(element, className) {
      do {
        if (element.classList && element.classList.contains(className)) {
          return true;
        }
        element = element.parentNode;
      } while (element);
      return false;
    },
  },
  mounted() {
    if (!this.disableEsc) {
      document.addEventListener("keyup", this.closeMenuOnEsc);
    }
  },
  created: function () {
    document.addEventListener("click", this.documentClick);
  },
  unmounted: function () {
    document.removeEventListener("keyup", this.closeMenuOnEsc);
    document.removeEventListener("click", this.documentClick);
  },
  watch: {
    isOpen: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          if (!oldValue && newValue) {
            this.openMenu();
          }
          if (oldValue && !newValue) {
            this.closeMenu();
          }
        });
      },
    },
    right: {
      deep: true,
      immediate: true,
      handler(oldValue, newValue) {
        if (oldValue) {
          this.$nextTick(() => {
            this.$refs.bmBurgerButton.style.left = "auto";
            this.$refs.bmBurgerButton.style.right = "36px";
            this.$refs.sideNav.style.left = "auto";
            this.$refs.sideNav.style.right = "0px";
            document.querySelector(".bm-burger-button").style.left = "auto";
            document.querySelector(".bm-burger-button").style.right = "36px";
            document.querySelector(".bm-menu").style.left = "auto";
            document.querySelector(".bm-menu").style.right = "0px";
            document.querySelector(".cross-style").style.right = "250px";
          });
        }
        if (newValue) {
          if (this.$refs.bmBurgerButton.hasAttribute("style")) {
            this.$refs.bmBurgerButton.removeAttribute("style");
            this.$refs.sideNav.style.right = "auto";
            document
              .querySelector(".bm-burger-button")
              .removeAttribute("style");
            document.getElementById("sideNav").style.right = "auto";
            document.querySelector(".cross-style").style.right = "0px";
          }
        }
      },
    },
  },
};
</script>
<style scoped>
.nav-normal {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  min-height: 50px;
  justify-content: space-around;
}
.categorybar {
  height: auto;
  background-color: black;
}
.burgerandcategory {
  height: 100px;
  background-color: grey;
  display: block;
  height: auto;
}
.burger {
  height: auto;
  background-color: white;
}
@media (max-width: 10500px) {
  .nav-normal {
    max-height: auto;
    min-height: 60px;
    display: block;
    text-align: center;
    align-items: center;
  }
  .burger {
    height: 80px;
    background-color: white;
  }
  html {
    height: 100%;
  }
  .bm-burger-button {
    position: absolute;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 36px;
    cursor: pointer;
  }
  .bm-burger-button.hidden {
    display: none;
  }
  .bm-burger-bars {
    background-color: #373a47;
  }
  .line-style {
    position: absolute;
    height: 20%;
    left: 0;
    right: 0;
  }
  .cross-style {
    position: absolute;
    top: 12px;
    right: 2px;
    cursor: pointer;
  }
  .bm-cross {
    background: #bdc3c7;
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  .bm-cross-button.hidden {
    display: none;
  }
  .bm-menu {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    background-color: white;
    overflow-x: hidden;
    padding-top: 60px;
    transition: 0.5s;
  }
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  .bm-item-list {
    color: #b8b7ad;
    margin-left: 10%;
    font-size: 20px;
    display: block;
  }
  .bm-item-list > {
    display: flex;
    text-decoration: none;
    padding: 1em;
  }
  .bm-item-list > * > span {
    margin-left: 10px;
    font-weight: 700;
    color: white;
  }
  .divclasse {
    text-emphasis-color: white;
    vertical-align: 20px;
  }
  .GeeksLogo {
    size: 20px;
  }
}
</style>
