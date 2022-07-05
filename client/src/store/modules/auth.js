export default {
  state: () => ({
    id: localStorage.getItem("id") || "",
    exp: localStorage.getItem("exp") || "",
  }),
  mutations: {
    setId: (state, payload) => {
      localStorage.setItem("id", payload);
      if (!payload) {
        localStorage.removeItem("id");
      }
      state.id = payload;
    },
    setExp: (state, payload) => {
      localStorage.setItem("exp", payload);
      if (!payload) {
        localStorage.removeItem("exp");
      }
      state.exp = payload;
    },
  },
  getters: {
    getId: (state) => {
      return state.id;
    },
    getExp: (state) => {
      return state.exp;
    },
  },
};
