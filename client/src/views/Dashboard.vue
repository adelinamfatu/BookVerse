<template>
  <div class="container">
    <v-card style="height: 95vh; width: 100%" elevation="12">
      <v-card-title>Dashboard</v-card-title>
      <v-card-text>
        <p>This is the dashboard.</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

export default {
  name: 'Dashboard',
  setup() {
    const store = useStore();
    const router = useRouter();
    if (!store.state.user) {
        router.push('/login');
    }
  },
};
</script>

<style scoped>
.container {
  background-color: #E3F2FD;
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>