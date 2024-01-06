import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        user: null
      }
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
      clearUser(state) {
        state.user = null;
      },
    }
});

export { store };