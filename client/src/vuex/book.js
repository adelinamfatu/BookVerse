import { booksApi, bookshelvesApi } from "../api"
import { toast } from 'vue3-toastify';

const state = {
  bookDetails: null,
  isFavorite: false,
  userBookshelves: [],
  selectedBookshelf: null,
  userTags: [],
  selectedTags: [],
  hasComments: false,
};

const getters = {
  getBookDetails: (state) => state.bookDetails,
  getIsFavorite: (state) => state.isFavorite,
  getUserBookshelves: (state) => state.userBookshelves,
  getSelectedBookshelf: (state) => state.selectedBookshelf,
  getUserTags: (state) => state.userTags,
  getSelectedTags: (state) => state.selectedTags,
  getHasComments: (state) => state.hasComments,
};

const actions = {
  async fetchBookDetails({ commit, rootGetters }, isbn) {
    const token = rootGetters['auth/firebaseToken'];
    
    try {
      const bookDetails = await booksApi.getBookDetails(token, isbn);
      commit('setBookDetails', { bookDetails, isbn });
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  },

  async fetchUserBookshelves({ commit, rootGetters }, isbn) {
    const token = rootGetters['auth/firebaseToken'];
    
    try {
      const userBookshelves = await bookshelvesApi.getUserBookshelves(token, isbn);
      commit('setUserBookshelves', userBookshelves);
    } catch (error) {
      console.error('Error fetching user bookshelves:', error);
    }
  },

  async toggleFavorite({ commit, rootGetters }, isbn) {
    const token = rootGetters['auth/firebaseToken'];
    
    try {
      await booksApi.toggleFavorite(token, !state.isFavorite, isbn);
      commit('setFavorite', !state.isFavorite);
    } catch (error) {
      console.log(error);
    }
  },

  async addBookToBookshelf({ rootGetters }, { bookshelf, bookDetails }) {
    const token = rootGetters['auth/firebaseToken'];
    
    try {
      await booksApi.addBookToBookshelf(token, {
        bookshelfId: bookshelf.id,
        isbn: bookDetails.isbn,
        title: bookDetails.title,
        author: bookDetails.author,
        coverImage: bookDetails.coverImage,
        nbPages: bookDetails.nbPages,
      });
    } catch (error) {
      console.error('Error adding book to bookshelf:', error);
    }
  },
    
  async removeBookFromBookshelf({ rootGetters }, { bookshelf, isbn }) {
    const token = rootGetters['auth/firebaseToken'];
    
    try {
      await booksApi.removeBookFromBookshelf(token, bookshelf.id, isbn);
    } catch (error) {
      console.error('Error removing book from bookshelf:', error);
    }
  },
};

const mutations = {
  setBookDetails(state, { bookDetails, isbn }) {
    state.bookDetails = { ...bookDetails, isbn };
    state.isFavorite = bookDetails.isFavorite;
    state.hasComments = bookDetails.comments && Object.keys(bookDetails.comments).length > 0;
  },

  setUserBookshelves(state, userBookshelves) {
    state.userBookshelves = userBookshelves.filter((bookshelf) => bookshelf.isDefault);
    state.selectedBookshelf = state.userBookshelves.find((bookshelf) => bookshelf.isSelected === true) || null;

    state.userTags = userBookshelves.filter((bookshelf) => !bookshelf.isDefault);
    state.selectedTags = state.userTags.find((tag) => tag.isSelected === true);
  },

  setFavorite(state, isFavorite) {
    state.isFavorite = isFavorite;
  },

  setSelectedBookshelf(state, selectedBookshelf) {
    state.selectedBookshelf = selectedBookshelf;
  },

  showToast({ commit }, { message, type }) {
    toast(message, {
      autoClose: 3000,
      type: type,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};