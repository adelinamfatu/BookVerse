<template>
  <v-card style="width: 85%" elevation="12" color="orange-lighten-5">
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        color="blue-lighten-4"
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
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-bookshelf" title="My bookshelves" value="myfiles" class="mt-5"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" class="mt-5"></v-list-item>
          <v-list-item prepend-icon="mdi-heart" title="Shared with me" value="shared" class="mt-5"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" class="mt-10" @click="showLogoutDialog"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 85vh"></v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { signOut } from "firebase/auth";
import { auth } from '../firebase'
import { useRouter } from 'vue-router'

const dialogLogout = ref(false);
const router = useRouter();

const showLogoutDialog = () => {
  dialogLogout.value = true;
}

const logout = () => {
  localStorage.removeItem('firebaseToken');
  dialogLogout.value = false;
  signOut(auth).then(() => {
    router.push('/login');
  }).catch((error) => {
    console.error(error);
  });
}
</script>