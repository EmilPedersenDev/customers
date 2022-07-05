import axios from "axios";
import store from "../store/index";
import router from "../router";

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (
      err.response.status === 401 &&
      err.response.data.message === "jwt expired"
    ) {
      try {
        const { data } = await api.get("/refresh-token");

        // if we get the refresh token back in response
        // set claims response to the store
        if (data.claims) {
          const { id, exp } = JSON.parse(data.claims);
          store.commit("setId", id);
          store.commit("setExp", exp);
        }

        // Retry original request if we get a refresh token 
        // response
        return api.request(err.config);
      } catch (err) {
        store.commit("setId");
        store.commit("setExp");
        router.push("/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);
