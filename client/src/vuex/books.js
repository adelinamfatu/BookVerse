import { booksApi } from '../api';

const state = {
  recommendedBooks: [],
  allBooks: [],
  filteredBooks: [],
  favoriteBooks: [],
  topBooks: [],
  genreBooks: [],
};

const getters = {
  getRecommendedBooks: (state) => state.recommendedBooks,
  getAllBooks: (state) => state.allBooks,
  getFilteredBooks: (state) => state.filteredBooks,
  getFavoriteBooks: (state) => state.favoriteBooks,
  getTopBooks: (state) => state.topBooks,
  getGenreBooks: (state) => state.genreBooks,
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

  async fetchTopBooks({ commit, rootGetters }) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const topBooks = await booksApi.getTopBooks(token);
      commit('setTopBooks', topBooks);
    } catch (error) {
      console.error('Error fetching top books:', error);
    }
  },

  async fetchGenreBooks({ commit, rootGetters }, genre) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const genreBooks = await booksApi.getGenreBooks(token, genre);
      commit('setGenreBooks', genreBooks);
    } catch (error) {
      console.error('Error fetching genre books:', error);
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

  setTopBooks(state, topBooks) {
    state.topBooks = topBooks;
  },

  setGenreBooks(state, genreBooks) {
    state.genreBooks = genreBooks;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};