import { api } from "../../service/api";
import Vue from "vue";

export default {
  state: () => ({
    user: null,
  }),
  actions: {
    getUser: async ({ commit, getters }) => {
      return api
        .get("/user")
        .then((result) => {
          const { data } = result;

          if (data) {
            commit("setUser", data);
          }

          if (!getters.isLoggedIn) {
            commit("setLoggedIn", "jdufg");
          }
        })
        .catch((err) => {
          commit("setLoggedIn", "");
          throw err;
        });
    },
    setUser: ({ commit }, user) => {
      commit("setUser", user);
    },
  },
  mutations: {
    setUser: (state, user) => {
      state.user = Object.assign({}, user);
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
  },
};
