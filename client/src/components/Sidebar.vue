<template>
  <div>

    <v-navigation-drawer 
      v-if="isDesktop"
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
            :prepend-avatar="userDetails.profilePictureUrl || 'https://firebasestorage.googleapis.com/v0/b/bookverse-86b43.appspot.com/o/profile.png?alt=media&token=eefc0167-5b43-45d6-9d69-35b05961cfaa'"
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
          class="mt-6"
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

    <v-bottom-navigation 
      v-if="!isDesktop"
      bg-color="blue-lighten-4"
      grow>
      <v-btn
        v-for="item in items"
        :key="item.title"
        :value="item.route"
        :class="{ 'v-btn--active': $route.name === item.route }"
        @click="$router.push(item.route)"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span>{{ item.title }}</span>
      </v-btn>
    </v-bottom-navigation>
    
  </div>
</template>

<script>
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
      isDesktop: true,
    };
  },

  computed: {
    userDetails() {
      return this.$store.getters['users/getUserDetails'];
    },
  },
  
  methods: {
    async fetchUserData() {
      await this.$store.dispatch('users/fetchUserData');
    },

    showLogoutDialog() {
      this.dialogLogout = true;
    },

    confirmLogout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
      this.dialogLogout = false;
    },

    updateScreenSize() {
      this.isDesktop = window.innerWidth >= 960;
    },
  },

  mounted() {
    this.fetchUserData();
    this.updateScreenSize();
    window.addEventListener('resize', this.updateScreenSize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateScreenSize);
  },
};
</script>