import Vue from 'vue'
import Vuex from 'vuex'

import index_module from './index/index'
Vue.use(Vuex)

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        index: index_module
    }
})