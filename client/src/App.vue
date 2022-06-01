<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <div class="user-form">
        <h1>Post User</h1>
        <form @submit.prevent="submit">
          <v-text-field
            label="First name"
            hide-details="auto"
            v-model="model.firstname"
          ></v-text-field>
          <v-text-field
            label="Last name"
            hide-details="auto"
            v-model="model.lastname"
          ></v-text-field>
          <v-text-field
            label="Email"
            hide-details="auto"
            v-model="model.email"
            type="email"
          ></v-text-field>
          <v-text-field
            label="Password"
            hide-details="auto"
            type="password"
            v-model="model.password"
          ></v-text-field>
          <v-btn class="mr-4" type="submit"> submit </v-btn>
        </form>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { api } from "@/service/api.js";

export default {
  data() {
    return {
      model: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        const { data } = await api.post("/user", this.model);
        console.log("user -->", data);
      } catch (error) {
        console.error(error);
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

  .user-form {
    width: 100%;
    max-width: 700px;
    margin: 50px auto;
  }

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
