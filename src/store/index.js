import {createStore} from 'vuex'
import {auth} from "@/store/modules/Auth";
import {FormData} from "@/store/modules/FormData";
import createPersistedState from "vuex-persistedstate";

export default createStore({
    modules: {
        auth,
        CRUDForm: FormData
    },
    plugins: [createPersistedState()]
})
