import { createStore } from 'vuex';
import authModule from './vuex/auth'
import sidebarModule from './vuex/sidebar'
import booksModule from './vuex/books'

const store = createStore({
  modules: {
    auth: authModule, 
    sidebar: sidebarModule,
    books: booksModule
  },
});

export default store;