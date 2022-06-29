<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <v-text-field
        v-model="user.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.user.email.$touch()"
        @blur="$v.user.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        :error-messages="passwordErrors"
        label="Password"
        type="password"
        required
        @input="$v.user.password.$touch()"
        @blur="$v.user.password.$touch()"
      ></v-text-field>
      <v-btn class="mr-4" type="submit"> Login </v-btn>
    </form>
  </div>
</template>

<script>
import { api } from "@/service/api.js";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "Login",
  mixins: [validationMixin],
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    user: {
      email: { required, email },
      password: { required },
    },
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push("/");
    }
  },
  watch: {
    isLoggedIn(val) {
      if (val) {
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.required && errors.push("Password is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.email && errors.push("Must be valid e-mail");
      !this.$v.user.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  methods: {
    ...mapActions(["setUser"]),
    ...mapMutations(["setLoggedIn"]),
    async onSubmit() {
      this.$v.$touch();
      try {
        const { data } = await api.post("/login", this.user);
        if (data.user) {
          this.setLoggedIn("vkallv");
          this.setUser(data.user);
        }
        this.$router.push("/");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .v-btn:not(.v-btn--round).v-size--default {
    margin-top: 1.5rem;
  }
}
</style>
