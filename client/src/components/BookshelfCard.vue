<template>
  <v-card class="mb-4">
    <v-container :style="{ backgroundColor: color, height: '200px' }">
    </v-container>

    <v-row>
      <v-col :md="isEditing ? 8 : 6">
        <v-card-title>
          <template v-if="!isEditing">{{ editedTitle }}</template>
          <template v-else>
            <v-text-field v-model="editedTitle" label="Edit Title"></v-text-field>
          </template>
        </v-card-title>
      </v-col>

      <v-col :md="isEditing ? 4 : 6" class="d-flex">
        <v-card-actions class="ml-auto">
          <v-btn icon @click="toggleEditing">
            <v-icon>{{ isEditing ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
          </v-btn>
          <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="toggleShow"></v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ supplementaryText }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: String,
    title: String,
    color: String,
    supplementaryText: String,
  },

  data() {
    return {
      show: false,
      isEditing: false,
      editedTitle: this.title,
    };
  },

  methods: {
    toggleShow() {
      this.show = !this.show;
    },

    toggleEditing() {
      if (this.isEditing) {
        this.isEditing = false;
        this.saveChanges();
      } else {
        this.isEditing = true;
      }
    },

    async saveChanges() {
      const token = this.$store.getters['auth/firebaseToken'];

      const updatedData = {
        title: this.editedTitle,
        color: this.color,
        supplementaryText: this.supplementaryText,
      };

      axios.put(`http://localhost:6100/api/bookshelves/update/${this.id}`, updatedData, {
        headers: {
          'x-access-token': token,
        },
      })
      .then(response => {
        console.log('Update successful', response.data);
      })
      .catch(error => {
        console.error('Error updating bookshelf', error);
      });
    },
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
