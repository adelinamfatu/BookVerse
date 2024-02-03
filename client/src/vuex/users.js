import { usersApi } from '../api';
import { toast } from 'vue3-toastify';

const state = {
  userDetails: null,
};

const getters = {
  getUserDetails: (state) => state.userDetails,
};

const actions = {
  async fetchUserData({ commit, rootGetters }) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const userDetails = await usersApi.getUserInfo(token);
      commit('setUserDetails', userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  },

  async saveUserProfile({ dispatch, rootGetters }, userDetails) {
    try {
      const token = rootGetters['auth/firebaseToken'];
      const response = await usersApi.updateUserProfile(token, userDetails);

      if(response.status === 200) {
        dispatch('showToast', { message: response.data.message, type: 'success' });
      } else {
        dispatch('showToast', { message: 'Error uploading the profil. Please try again', type: 'error' });
      }
    } catch (error) {
      dispatch('showToast', { message: 'Error uploading the profil. Please try again', type: 'error' });
    }
  },

  async uploadProfilePicture({ dispatch, commit, rootGetters }, profilePictureUrl) {
    try {
      const token = rootGetters['auth/firebaseToken'];
      const response = await usersApi.uploadProfilePicture(token, profilePictureUrl);
      
      if(response.status === 200) {
        commit('setProfilePictureUrl', response.data.profilePictureUrl);
        dispatch('showToast', { message: response.data.message, type: 'success' });
      } else {
        dispatch('showToast', { message: 'Error uploading profile picture. Please try again', type: 'error' });
      }
    } catch (error) {
      dispatch('showToast', { message: 'Error uploading profile picture. Please try again', type: 'error' });
    }
  },

  showToast({ commit }, { message, type }) {
    toast(message, {
      autoClose: 3000,
      type: type,
    });
  },
};

const mutations = {
  setUserDetails(state, userDetails) {
    state.userDetails = userDetails;
  },

  setProfilePictureUrl(state, profilePictureUrl) {
    state.userDetails.profilePictureUrl = profilePictureUrl;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};