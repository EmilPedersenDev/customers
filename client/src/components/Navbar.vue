<template>
  <nav>
    <div class="navbar" v-if="!navbarFullscreen">
      <div class="navbar__left"></div>
      <div class="navbar__right">
        <i class="fa-solid fa-bars" @click.stop="onToggleNavbar(true)"></i>
      </div>
    </div>
    <div class="navbar-full-screeen" v-else>
      <div class="navbar-full-screeen__wrapper">
        <i class="fa-solid fa-xmark" @click.stop="onToggleNavbar(false)"></i>
        <div class="navbar-links">
          <ul>
            <li>
              <router-link @click.native.prevent="onToggleNavbar(false)" to="/"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                @click.native.prevent="onToggleNavbar(false)"
                to="/login"
                >Login</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    navbarFullscreen: Boolean,
  },
  methods: {
    onToggleNavbar(val) {
      this.$emit("toggle-navbar", val);
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  height: 3.75rem;

  .navbar {
    width: 100%;
    padding: 1rem 1.5rem;
    display: flex;
    box-shadow: 0 0 5px 5px rgb(228, 228, 228);
    justify-content: space-between;

    .navbar__right {
      .fa-solid {
        font-size: 1.5rem;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .navbar-full-screeen {
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 1;
    background-color: #fff;
    padding: 1rem;

    .navbar-full-screeen__wrapper {
      width: 100%;
      height: 100%;
      position: relative;

      .fa-solid.fa-xmark {
        position: absolute;
        font-size: 1.5rem;
        top: 0;
        right: 0;

        &:hover {
          cursor: pointer;
        }
      }

      .navbar-links {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 300px;

        ul {
          li {
            list-style-type: none;
            margin-bottom: 1rem;
            a {
              color: #000;
              text-decoration: none;
              font-size: 2rem;

              &:hover {
                opacity: 0.8;
              }
            }
          }
        }
      }
    }
  }
}
</style>
