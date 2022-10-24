import axios from "axios";

export const auth = {
    state: {
        authenticated: false,
        user: {},
    },

    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        user(state) {
            return state.user;
        },
    },

    mutations: {
        setAuthenticated(state, authenticated) {
            state.authenticated = authenticated;
        },

        setUser(state, user) {
            state.user = user;
        }
    },

    actions: {
        async login({commit}, {username, password}) {
            await axios.get('http://localhost/sanctum/csrf-cookie');
            try {
                await axios.post('http://localhost/login', {
                    email: username,
                    password: password,
                    type: 'user'
                });
                commit('setAuthenticated', true);
                commit('setUser', {username: username});
            } catch (e) {
                commit('setAuthenticated', false);
                commit('setUser', {});
            }
        },
        logout({commit}) {
            commit('setAuthenticated', false);
            commit('setUser', {});
        }
    }
}