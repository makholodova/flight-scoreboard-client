﻿<script setup>
import { deleteCity } from '@/plugins/api.js'
import { reactive } from 'vue'

defineProps(['city'])
const emit = defineEmits(['cityDeleted'])
const state = reactive({ dialog: false })

function buttonCancelClick() {
  state.dialog = false
}

function buttonDeleteClick(id) {
  deleteCity(id)
    .then(() => emit('cityDeleted'))
    .finally(() => buttonCancelClick())
}
</script>

<template>
  <v-dialog v-model="state.dialog" width="480">
    <template v-slot:activator="{ props }">
      <v-icon class="me-2" size="small" title="Delete" v-bind="props"> mdi-delete</v-icon>
    </template>
    <v-card>
      <v-card-title class="text-h5">Are you sure you want to delete this city?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="buttonCancelClick"> Cancel </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="buttonDeleteClick(city.id)"> OK </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
