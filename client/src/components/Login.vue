<template>
  <v-container fluid class="fill-height" style="background-color: #E3F2FD;">
    <v-row justify="center">
      <v-col cols="7" sm="3" md="5">
        <v-card color="light-blue-lighten-4" elevation="10"> 
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
            <v-form @submit.prevent="login">
              <v-text-field
                :rules="emailRules"
                class="mb-4"
                density="compact"
                label="Email"
                placeholder="Email address"
                clearable
                v-model="email"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined">
              </v-text-field>
              <v-text-field
                :rules="passwordRules"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                v-model="password"
                label="Password"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible">
              </v-text-field>
              <div class="d-flex justify-center">
                <v-btn @click="login" color="orange-accent-1">Login</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-row justify="center" class="mb-4">
            <v-col>
              <div class="d-flex justify-center align-center">
                <span style="font-size: 14px;">Don't have an account?</span>
                <router-link to="/register" style="margin-left: 5px; text-decoration: underline; color: blue;">Register</router-link>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref("");
const password = ref("");
const emailRules = ref([
  value => !!value || 'Email is required',
  value => /.+@.+\..+/.test(value) || 'Email must be valid'
]);
const passwordRules = ref([
  value => !!value || 'Password is required',
  value => (value && value.length >= 8) || 'Password should be at least 8 characters long'
])
const visible = ref(false);

const login = async () => {
  const userData = {
    email: email.value,
    password: password.value
  };

  try {
    const response = await axios.post('http://localhost:6100/api/users/signin', userData);
    const token = response.data;
    localStorage.setItem('firebaseToken', token);
    router.push('/books');
  } catch (error) {
    console.error("Error logging in user:", error);
  }
}
</script>