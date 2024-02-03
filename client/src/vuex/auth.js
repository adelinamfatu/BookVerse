import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const state = {
  isLogged: localStorage.getItem("isLogged") || false,
  user: JSON.parse(localStorage.getItem("userData")) || null,
  firebaseToken: localStorage.getItem("firebaseToken") || null,
};

const getters = {
  isLogged: (state) => JSON.parse(state.isLogged),
  user: (state) => state.user,
  firebaseToken: (state) => state.firebaseToken,
};

const actions = {
  async login({ commit, dispatch }, loginData) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      commit('setLoginStatus', true);
      commit('setUser', user);
      commit('setFirebaseToken', idToken);

      //dispatch('fetchUserData');
    } catch (error) {
      console.error('Login error:', error);
    }
  },

  async register({ commit, dispatch }, registerData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      commit('setLoginStatus', true);
      commit('setUser', user);
      commit('setFirebaseToken', idToken);

      //dispatch('storeUserData');
    } catch (error) {
      console.error('Registration error:', error);
    }
  },

  async logout({ commit }) {
    commit('setLoginStatus', false);
    commit('setUser', null);
    commit('setFirebaseToken', null);
  },
};

const mutations = {
  setLoginStatus(state, status) {
    state.isLogged = status;
    localStorage.setItem("isLogged", status);
  },

  setUser(state, userData) {
    state.user = userData;
    localStorage.setItem("userData", JSON.stringify(userData));
  },

  setFirebaseToken(state, token) {
    state.firebaseToken = token;
    localStorage.setItem("firebaseToken", token);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};