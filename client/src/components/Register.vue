<template>
  <v-container fluid class="fill-height" style="background-color: #E8EAF6;">
    <v-row justify="center">
      <v-col cols="7" sm="3" md="5">
        <v-card color="light-blue-lighten-4"> 
          <v-row justify="center" class="mt-5">
            <v-col class="d-flex justify-center align-center">
              <v-avatar size="70">
                <img src="@/assets/logo.png" alt="Icon" style="width: 70px; height: auto;">
              </v-avatar>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-card-title class="text-h5" style="color: white; text-align: center; margin: 0; padding: 0;">
                <span style="font-size: 32px; font-weight: bold">BookVerse</span>
              </v-card-title>
            </v-col>
          </v-row>
          <v-card-text class="mt-5">
            <v-form @submit.prevent="register">
              <v-text-field color="indigo-darken-1" clearable v-model="email" label="Email"></v-text-field>
              <v-text-field color="indigo-darken-1" clearable v-model="password" label="Password" type="password"></v-text-field>
              <div class="d-flex justify-center">
                <v-btn @click="register" color="indigo-lighten-3" class="mt-4 mb-4">Register</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';

const email = ref("");
const password = ref("");

const register = async () => {
  const userData = {
    email: email.value,
    password: password.value
  };

  try {
    const response = await axios.post('http://localhost:6100/api/users/add', userData);
  } catch (error) {
    console.error("Error registering user:", error);
  }
}
</script>