﻿<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app class="d-flex d-sm-none">
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.path"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar density="compact">
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      <v-toolbar-title> Flight Scoreboard</v-toolbar-title>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn v-for="item in scoreboards" :key="item.title" :to="item.path" flat>
          <v-icon dark left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn v-for="item in menuItems" :key="item.title" :to="item.path" flat>
          <v-icon dark left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <RouterView />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      appTitle: 'Flight Scoreboard',
      sidebar: false,
      menuItems: [

        { title: 'City', path: '/city', icon: 'mdi-city' },
        { title: 'Airline', path: '/airline', icon: 'mdi-badge-account-horizontal' },
        { title: 'Pilot', path: '/pilot', icon: 'mdi-account' },
        { title: 'Airplane', path: '/airplane', icon: 'mdi-airplane' },
        { title: 'Flight', path: '/flight', icon: 'mdi-table' }
      ],
      scoreboards: [
        { title: 'Scoreboard arrival ', path: '/scoreboardArrival', icon: 'mdi-airplane-landing' },
        { title: 'Scoreboard departure ', path: '/scoreboardDeparture', icon: 'mdi-airplane-takeoff' }
      ]

    }
  }
}
</script>
