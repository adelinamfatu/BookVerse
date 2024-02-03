import { usersApi } from '../api';

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
};

const mutations = {
  setUserDetails(state, userDetails) {
    state.userDetails = userDetails;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};