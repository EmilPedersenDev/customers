<template>
  <div id="app">
    <navbar
      :navbarFullscreen="navbarFullscreen"
      @toggle-navbar="onToggleNavbar"
    />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      navbarFullscreen: false,
    };
  },
  async created() {
    try {
      await this.getUser();
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    ...mapActions(["getUser"]),
    onToggleNavbar(showNavbar) {
      this.navbarFullscreen = showNavbar;

      const bodyEl = document.querySelector("body");

      if (bodyEl) {
        bodyEl.classList.toggle("hide-scroll", showNavbar);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;

  .container {
    padding: 3rem 0.75rem;
    min-height: calc(100vh - 3.75rem);
    position: relative;
  }
}
</style>
