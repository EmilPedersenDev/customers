<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <h1>Updating v.2 New CI/CD done.</h1>
      <p>Testing pr only on merge to master!</p>
      <v-btn @click="getCustomers">Get Customers</v-btn>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { api } from "@/service/api.js";

export default {
  methods: {
    async getCustomers() {
      try {
        const { data } = await api.get("/user");
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    },
    onClick() {
      console.log("click");
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

  .v-btn {
    margin-top: 1.5rem;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
