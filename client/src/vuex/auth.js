import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'vue3-toastify';

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
    } catch (error) {
      dispatch('showToast', {
        message: 'Wrong credentials or account not found.',
        type: 'error',
      });
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
    } catch (error) {
      console.error('Registration error:', error);
    }
  },

  async resetPassword({ dispatch }, email) {
    try {
      await sendPasswordResetEmail(auth, email);
      dispatch('showToast', {
        message: 'Password reset email sent successfully!',
        type: 'success',
      });
    } catch (error) {
      dispatch('showToast', {
        message: 'Password reset error.',
        type: 'error',
      });
      throw error;
    }
  },

  async logout({ commit }) {
    commit('setLoginStatus', false);
    commit('setUser', null);
    commit('setFirebaseToken', null);
  },

  showToast({ commit }, { message, type }) {
    toast(message, {
      autoClose: 3000,
      type: type,
    });
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