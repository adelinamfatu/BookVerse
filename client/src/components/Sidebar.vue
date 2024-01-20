<template>
  <div>
    <v-navigation-drawer 
      expand-on-hover 
      rail 
      color="blue-lighten-4"
      elevation="12"
      >
      <v-dialog v-model="dialogLogout" max-width="400px">
          <v-card>
          <v-card-title class="text-center">Confirm Logout</v-card-title>
          <v-card-text class="text-center">Are you sure you want to logout?</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn text @click="dialogLogout = false">No</v-btn>
            <v-btn text color="primary" @click="confirmLogout">Yes</v-btn>
          </v-card-actions>
          </v-card>
        </v-dialog>
      <v-list>
        <v-list>
            <v-list-item
              v-if="userDetails"
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              :title="userDetails.name"
              :subtitle="userDetails.email"
            ></v-list-item>
          </v-list>
        <v-divider></v-divider>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :to="item.route"
          rounded="xl"
          :prepend-icon="item.icon"
          class="mt-5"
        ></v-list-item>
        <v-list-item
          rounded="xl"
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          class="mt-10"
          @click="showLogoutDialog"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialogLogout: false,
      items: [
        { title: 'Dashboard', route: '/dashboard', icon: 'mdi-view-dashboard' },
        { title: 'My bookshelves', route: '/bookshelves', icon: 'mdi-bookshelf' },
        { title: 'Favorites', route: '/favorites', icon: 'mdi-heart' },
        { title: 'Profile', route: '/profile', icon: 'mdi-account' },
      ],
      userDetails: null,
    };
  },
  
  methods: {
    async fetchUserData() {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const response = await axios.get('http://localhost:6100/api/users/info', {
          headers: {
              'x-access-token': token,
            },
        });
        this.userDetails = response.data;
        this.userDetails.email = this.$store.getters['auth/user'].email;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },

    showLogoutDialog() {
      this.dialogLogout = true;
    },

    confirmLogout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
      this.dialogLogout = false;
    },
  },

  mounted() {
    this.fetchUserData();
  },
};
</script>