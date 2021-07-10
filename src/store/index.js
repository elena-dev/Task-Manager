import Vue from 'vue'
import Vuex from 'vuex'
import messages from "./modules/messages";
import task from "./modules/task";
import all from "./modules/all";
import user from "./modules/user";

Vue.use(Vuex)

export default new Vuex.Store({
	namespaced: true,
    modules:{
        messages, task, all,user
    },

    state: {
    },

    mutations: {
    },

    actions: {
    },

    getters: {
    }
})
