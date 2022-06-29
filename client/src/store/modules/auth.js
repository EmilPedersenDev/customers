export default {
  state: () => ({
    isLoggedIn: localStorage.getItem(process.env.VUE_APP_LOGGED_IN) || "",
  }),
  mutations: {
    setLoggedIn: (state, payload) => {
      localStorage.setItem(process.env.VUE_APP_LOGGED_IN, payload);
      state.isLoggedIn = payload;
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return state.isLoggedIn;
    },
  },
};
