<template>
  <v-container fluid class="fill-height" style="background-color: #E3F2FD;">
    <v-row justify="center">
      <v-col cols="12" md="7" sm="8" lg="5">
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
            <v-form @submit.prevent="resetPassword">
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
              <div class="d-flex justify-center">
                <v-btn @click="resetPassword" color="orange-accent-1">Reset Password</v-btn>
              </div>
              <div class="d-flex justify-center mt-2">
                <router-link to="/login" style="font-size: 14px; text-decoration: underline; color: blue;">Back to Login</router-link>
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
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const email = ref("");
const emailRules = ref([
  value => !!value || 'Email is required',
  value => /.+@.+\..+/.test(value) || 'Email must be valid'
]);

const resetPassword = async () => {
  if (emailRules.value.every(rule => rule(email.value) === true)) {
    try {
      await store.dispatch('auth/resetPassword', email.value);
    } catch (error) {
      console.error('Password reset error:', error);
    }
  }
}
</script>