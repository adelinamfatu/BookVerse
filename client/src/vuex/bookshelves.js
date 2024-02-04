import { bookshelvesApi } from '../api';
import { toast } from 'vue3-toastify';

const state = {
  bookshelves: [],
  selectedBookshelf: {
    books: [],
    title: '',
    isDefault: false,
  },
};

const getters = {
  getBookshelves: (state) => state.bookshelves,
  getSelectedBookshelf: (state) => state.selectedBookshelf,
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

  async fetchSelectedBookshelf({ commit, rootGetters }, bookshelfId) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const selectedBookshelf = await bookshelvesApi.getBookshelfBooks(token, bookshelfId);
      commit('setSelectedBookshelf', selectedBookshelf);
    } catch (error) {
      console.error('Error fetching selected bookshelf:', error);
    }
  },

  async updateRating({ commit, dispatch, rootGetters }, { newRating, bookshelfId, isbn }) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const response = await bookshelvesApi.updateRating(token, bookshelfId, isbn, newRating);

      if (response.status === 200) {
        commit('updateBookRating', { isbn, newRating });
        dispatch('showToast', { message: response.data, type: 'success' });
      } else {
        dispatch('showToast', { message: 'Error updating the rating. Please try again.', type: 'error' });
      }
    } catch (error) {
      dispatch('showToast', { message: 'Error updating the rating. Please try again.', type: 'error' });
    }
  },

  async moveBook({ commit, dispatch, rootGetters }, { targetBookshelfTitle, bookshelfId, isbn }) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const response = await bookshelvesApi.moveBook(token, bookshelfId, isbn, targetBookshelfTitle);
      
      if (response.status === 200) {
        commit('removeBookFromSelectedBookshelf', isbn);
        dispatch('showToast', { message: response.data, type: 'success' });
      } else {
        dispatch('showToast', { message: 'Error moving the book to another bookshelf. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Error moving the book to another bookshelf. Please try again.', error);
    }
  },

  async updateCurrentPage({ commit, dispatch, rootGetters }, { bookshelfId, isbn, currentPage }) {
    const token = rootGetters['auth/firebaseToken'];

    if (currentPage > 0) {
      try {
        const response = await bookshelvesApi.updateCurrentPage(token, bookshelfId, isbn, currentPage);

        if (response.status === 200) {
          commit('updateBookCurrentPage', { isbn, currentPage });
          dispatch('showToast', { message: response.data, type: 'success' });
        } else {
          dispatch('showToast', { message: 'Error updating the progress. Please try again.', type: 'error' });
        }
      } catch (error) {
        dispatch('showToast', { message: 'Error updating the progress. Please try again.', type: 'error' });
      }
    }
  },

  async updateReview({ commit, dispatch, rootGetters }, { bookshelfId, isbn, review }) {
    const token = rootGetters['auth/firebaseToken'];

    try {
      const response = await bookshelvesApi.updateReview(token, bookshelfId, isbn, review);

      if (response.status === 200) {
        commit('updateBookReview', { isbn, review });
        dispatch('showToast', { message: response.data, type: 'success' });
      } else {
        dispatch('showToast', { message: 'Error updating the review. Please try again.', type: 'error' });
      }
    } catch (error) {
      dispatch('showToast', { message: 'Error updating the review. Please try again.', type: 'error' });
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

  setSelectedBookshelf(state, selectedBookshelf) {
    state.selectedBookshelf = selectedBookshelf;
  },

  updateBookRating(state, { isbn, newRating }) {
    const bookIndex = state.selectedBookshelf.books.findIndex(book => book.isbn === isbn);
    if (bookIndex !== -1) {
      state.selectedBookshelf.books[bookIndex].rating = newRating;
    }
  },

  removeBookFromSelectedBookshelf(state, isbn) {
    state.selectedBookshelf.books = state.selectedBookshelf.books.filter(book => book.isbn !== isbn);
  },

  updateBookCurrentPage(state, { isbn, currentPage }) {
    const bookIndex = state.selectedBookshelf.books.findIndex(book => book.isbn === isbn);
    if (bookIndex !== -1) {
      state.selectedBookshelf.books[bookIndex].currentPage = currentPage;
    }
  },

  updateBookReview(state, { isbn, review }) {
    const bookIndex = state.selectedBookshelf.books.findIndex(book => book.isbn === isbn);
    if (bookIndex !== -1) {
      state.selectedBookshelf.books[bookIndex].review = review;
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