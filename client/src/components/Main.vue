<template>
  <v-card style="width: 85%" elevation="12" color="orange-lighten-5">
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        color="blue-lighten-4"
      >
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
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 85vh"></v-main>
    </v-layout>
  </v-card>
</template>