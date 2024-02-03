import { bookshelvesApi } from '../api';

const state = {
  bookshelves: [],
};

const getters = {
  getBookshelves: (state) => state.bookshelves,
};

const actions = {
  async fetchBookshelves({ commit, rootGetters }) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const bookshelves = await bookshelvesApi.getBookshelves(token);
      commit('setBookshelves', bookshelves);
    } catch (error) {
      console.error('Error fetching bookshelves:', error);
    }
  },

  async addBookshelf({ commit, rootGetters }) {
    const token = rootGetters['auth/firebaseToken'];

    const newBookshelf = {
      title: 'New Bookshelf',
      color: '#607D8B',
    };

    try {
      const bookshelfId = await bookshelvesApi.addBookshelf(token, newBookshelf);
      newBookshelf.id = bookshelfId;
      
      commit('addBookshelf', newBookshelf);
    } catch (error) {
      console.error('Error adding bookshelf:', error);
    }
  },

  async deleteBookshelf({ commit, rootGetters }, bookshelfId) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      await bookshelvesApi.deleteBookshelf(token, bookshelfId);
      commit('deleteBookshelf', bookshelfId);
    } catch (error) {
      console.error('Error deleting bookshelf', error);
    }
  },

  async updateBookshelf({ commit, rootGetters }, { id, data }) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      await bookshelvesApi.updateBookshelf(token, id, data);
      commit('updateBookshelf', { id, data });
    } catch (error) {
      console.error('Error updating bookshelf', error);
    }
  },
};

const mutations = {
  setBookshelves(state, bookshelves) {
    state.bookshelves = bookshelves;
  },

  addBookshelf(state, newBookshelf) {
    state.bookshelves.push(newBookshelf);
  },

  deleteBookshelf(state, bookshelfId) {
    state.bookshelves = state.bookshelves.filter(bookshelf => bookshelf.id !== bookshelfId);
  },

  updateBookshelf(state, { id, data }) {
    const index = state.bookshelves.findIndex(bookshelf => bookshelf.id === id);
    if (index !== -1) {
      state.bookshelves[index] = { ...state.bookshelves[index], ...data };
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};