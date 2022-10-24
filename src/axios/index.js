import axios from "axios";
import store from "../store";
import router from "../router";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_ENV === "local" ? process.env.VUE_APP_API : 'http://back.minermanager.link/api/v1';
window.axios = axios;

window.axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (419 === error.response.status) {
        store.dispatch('logout').then(() =>{
            router.push('/');
        });
    } else {
        return Promise.reject(error);
    }
});

export default axios;
