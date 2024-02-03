import { booksApi } from '../api';

const state = {
  recommendedBooks: [],
  allBooks: [],
  filteredBooks: [],
};

const getters = {
  getRecommendedBooks: (state) => state.recommendedBooks,
  getAllBooks: (state) => state.allBooks,
  getFilteredBooks: (state) => state.filteredBooks,
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};