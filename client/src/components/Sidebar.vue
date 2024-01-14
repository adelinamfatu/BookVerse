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
          <v-btn text color="primary" @click="logout">Yes</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
    <v-list>
      <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
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
export default {
  data() {
    return {
      items: [
        { title: 'Dashboard', route: '/dashboard', icon: 'mdi-view-dashboard' },
        { title: 'My bookshelves', route: '/bookshelves', icon: 'mdi-bookshelf' },
        { title: 'Favorites', route: '/starred', icon: 'mdi-heart' },
      ],
    };
  },
};
</script>