<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>{{ user }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  computed: {
    ...mapGetters({ user: "getUser" }),
  },
};
</script>
