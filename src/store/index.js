// store/index.js

import {createStore} from 'vuex';
import Auth from "@/api/auth/Auth";

export default createStore({
  state: {
    authToken: null,
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    setToken(state, token) {
      state.authToken = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.authToken = null;
      state.isAuthenticated = false;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({commit}, token) {
      commit('setToken', token);
      localStorage.setItem('authToken', token);
    },
    logout({commit}) {
      commit('removeToken');
      localStorage.removeItem('authToken');
    },
    initializeAuth({commit, dispatch}) {
      const token = localStorage.getItem('authToken');
      if (token) {
        commit('setToken', token);
        dispatch('fetchUser');
      }
    },
    async fetchUser({commit, state}) {
      if (!state.authToken) return;
      try {
        const data = await Auth.me();
        commit('setUser', data);
      } catch (error) {
        console.error('Erro ao buscar o usuário logado:', error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    authToken: (state) => state.authToken,
    user: (state) => state.user
  },
});
