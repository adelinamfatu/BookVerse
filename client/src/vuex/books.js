import { booksApi } from '../api';

const state = {
  recommendedBooks: [],
  allBooks: [],
  filteredBooks: [],
  favoriteBooks: [],
};

const getters = {
  getRecommendedBooks: (state) => state.recommendedBooks,
  getAllBooks: (state) => state.allBooks,
  getFilteredBooks: (state) => state.filteredBooks,
  getFavoriteBooks: (state) => state.favoriteBooks,
};

const actions = {
  async fetchRecommendedBooks({ commit, rootGetters }) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const recommendedBooks = await booksApi.getRecommendedBooks(token);
      commit('setRecommendedBooks', recommendedBooks);
    } catch (error) {
      console.error('Error fetching recommended books:', error);
    }
  },

  async fetchAllBooks({ commit, rootGetters }) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const allBooks = await booksApi.getAllBooks(token);
      commit('setAllBooks', allBooks);
      commit('setFilteredBooks', allBooks);
    } catch (error) {
      console.error('Error fetching all books:', error);
    }
  },

  updateFilteredBooks({ commit, state }, searchQuery) {
    const allBooks = state.allBooks;
    const filteredBooks = allBooks.filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    commit('setFilteredBooks', filteredBooks);
  },

  async fetchFavoriteBooks({ commit, rootGetters }) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const favoriteBooks = await booksApi.getFavoriteBooks(token);
      commit('setFavoriteBooks', favoriteBooks);
    } catch (error) {
      console.error('Error fetching favorite books:', error);
    }
  },

  async addToFavorites({ commit, rootGetters }, bookId) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const updatedFavorites = await booksApi.addToFavorites(token, bookId);
      commit('setFavoriteBooks', updatedFavorites);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  },

  async removeFromFavorites({ commit, rootGetters }, bookId) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const updatedFavorites = await booksApi.removeFromFavorites(token, bookId);
      commit('setFavoriteBooks', updatedFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  },
};

const mutations = {
  setRecommendedBooks(state, recommendedBooks) {
    state.recommendedBooks = recommendedBooks;
  },

  setAllBooks(state, allBooks) {
    state.allBooks = allBooks;
  },

  setFilteredBooks(state, filteredBooks) {
    state.filteredBooks = filteredBooks;
  },

  setFavoriteBooks(state, favoriteBooks) {
    state.favoriteBooks = favoriteBooks;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};