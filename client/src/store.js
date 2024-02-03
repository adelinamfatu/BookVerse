import { createStore } from 'vuex';
import authModule from './vuex/auth'
import usersModule from './vuex/users'
import booksModule from './vuex/books'
import bookshelvesModule from './vuex/bookshelves'

const store = createStore({
  modules: {
    auth: authModule, 
    users: usersModule,
    books: booksModule,
    bookshelves: bookshelvesModule
  },
});

export default store;