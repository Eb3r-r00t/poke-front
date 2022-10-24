export const FormData = {
    state: {
        formData: {}
    },

    getters: {
        getFormData: state => state.formData
    },

    mutations: {
        setFormData(state, payload) {
            state.formData = {};
            state.formData = payload;
        }
    },

    actions: {
        setFormData({commit}, data) {
            commit('setFormData', data);
        }
    }
}