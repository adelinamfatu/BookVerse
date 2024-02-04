import axios from 'axios';
import store from './store';
import router from '@/router';

const BASE_URL = 'http://localhost:6100/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      store.dispatch('auth/logout');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export const usersApi = {
  getUserInfo: async (token) => {
    try {
      const response = await api.get('/users/profile', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUserProfile: async (token, userDetails) => {
    try {
      const response = await api.put('/users/update', userDetails, {
        headers: {
          'x-access-token': token,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  uploadProfilePicture: async (token, profilePictureUrl) => {
    if (profilePictureUrl) {
      const formData = new FormData();
      formData.append('file', profilePictureUrl);

      try {
        const response = await api.put('/users/picture', formData, {
          headers: {
            'x-access-token': token,
            'Content-Type': 'multipart/form-data',
          },
        });

        return response;
      } catch (error) {
        throw error;
      }
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

  getTopBooks: async (token) => {
    try {
      const response = await api.get('/books/top', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getGenreBooks: async (token, genre) => {
    try {
      const response = await api.get(`/books/top/${genre}`, {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBookDetails: async (token, isbn) => {
    try {
      const response = await api.get(`/books/details/${isbn}`, {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  toggleFavorite: async (token, isFavorite, isbn) => {
    try {
      console.log(isFavorite);
      const response = await api.put(
        `/books/favorites/${isFavorite ? 'add' : 'remove'}/${isbn}`,
        {},
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      return response.data.isFavorite;
    } catch (error) {
      throw error;
    }
  },

  addBookToBookshelf: async (token, data) => {
    try {
      const response = await api.post(`/bookshelves/add-book/${data.bookshelfId}`, {
        isbn: data.isbn,
        title: data.title,
        author: data.author,
        coverImage: data.coverImage,
        nbPages: data.nbPages
      }, {
        headers: {
          'x-access-token': token,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeBookFromBookshelf: async (token, bookshelfId, isbn) => {
    try {
      const response = await api.delete(`/bookshelves/delete-book/${bookshelfId}/${isbn}`, {
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

export const bookshelvesApi = {
  getUserBookshelves: async (token, isbn) => {
    try {
      const response = await api.get(`/bookshelves/book?isbn=${isbn}`, {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBookshelves: async (token) => {
    try {
      const response = await api.get('/bookshelves/user', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addBookshelf: async (token, newBookshelf) => {
    try {
      const response = await api.post('/bookshelves/add', {
        title: newBookshelf.title,
        color: newBookshelf.color,
      }, {
        headers: {
          'x-access-token': token,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteBookshelf: async (token, bookshelfId) => {
    try {
      const response = await api.delete(`/bookshelves/delete/${bookshelfId}`, {
        headers: {
          'x-access-token': token,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  updateBookshelf: async (token, bookshelfId, updatedData) => {
    try {
      const response = await api.put(`/bookshelves/update/${bookshelfId}`, updatedData, {
        headers: {
          'x-access-token': token,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  getBookshelfBooks: async (token, bookshelfId) => {
    try {
      const response = await api.get(`/bookshelves/books/${bookshelfId}`, {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateRating: async (token, bookshelfId, isbn, newRating) => {
    try {
      const response = await api.put(`/bookshelves/update-rating/${bookshelfId}/${isbn}`, {
        rating: newRating,
      }, {
        headers: {
          'x-access-token': token,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  moveBook: async (token, bookshelfId, isbn, targetBookshelfTitle) => {
    try {
      const response = await api.post(`/bookshelves/move-book/${bookshelfId}/${isbn}`, {
        targetBookshelfTitle,
      }, {
        headers: {
          'x-access-token': token,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  updateCurrentPage: async (token, bookshelfId, isbn, currentPage) => {
    try {
      const response = await api.put(`/bookshelves/update-current-page/${bookshelfId}/${isbn}`, {
        currentPage,
      }, {
        headers: {
          'x-access-token': token,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  updateReview: async (token, bookshelfId, isbn, review) => {
    try {
      const response = await api.put(`/bookshelves/update-review/${bookshelfId}/${isbn}`, {
        review,
      }, {
        headers: {
          'x-access-token': token,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
};