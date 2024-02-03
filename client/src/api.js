import axios from 'axios';

const BASE_URL = 'http://localhost:6100/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export const usersApi = {
  getUserInfo: async (token) => {
    try {
      const response = await api.get('/users/info', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const booksApi = {
  getRecommendedBooks: async (token) => {
    try {
      const response = await api.get('/books/recommended', {
        headers: {
          'x-access-token': token,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllBooks: async (token) => {
    try {
      const response = await api.get('/books/all', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFavoriteBooks: async (token) => {
    try {
      const response = await api.get('/books/favorites', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addToFavorites: async (token, bookId) => {
    try {
      const response = await api.post('/books/favorites/add', { bookId }, {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeFromFavorites: async (token, bookId) => {
    try {
      const response = await api.post('/books/favorites/remove', { bookId }, {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};