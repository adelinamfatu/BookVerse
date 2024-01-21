<template>
  <v-card class="mb-4">
    <v-container :style="{ backgroundColor: color, height: '200px' }">
      <!-- Delete button positioned inside the color container -->
      <v-row>
        <v-col class="text-right">
          <v-btn icon color="rgba(255, 255, 255, 0.25)" @click="openDeleteDialog">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
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
        <v-card-text class="d-flex justify-end align-end">
          {{ supplementaryText }}
          <v-btn icon @click="navigateToBookshelfRoute">
            <v-icon>mdi-arrow-expand-all</v-icon>
          </v-btn>
        </v-card-text>
      </div>
    </v-expand-transition>

    <v-dialog v-model="deleteDialogVisible" max-width="400px">
      <v-card>
        <v-card-title class="text-center">Confirm Delete</v-card-title>
        <v-card-text class="text-center">Are you sure you want to delete this bookshelf?</v-card-text>
        <v-card-actions class="justify-center">
          <v-btn text @click="cancelDelete">No</v-btn>
          <v-btn text color="primary" @click="confirmDelete">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      deleteDialogVisible: false,
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

    openDeleteDialog() {
      this.deleteDialogVisible = true;
    },

    cancelDelete() {
      this.deleteDialogVisible = false;
    },

    confirmDelete() {
      this.$emit('delete-bookshelf', this.id);
      this.deleteDialogVisible = false;
    },

    deleteBookshelf() {
      this.$emit('delete-bookshelf', this.id);
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

    navigateToBookshelfRoute() {
      this.$router.push(`/bookshelf/${this.id}`);
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
