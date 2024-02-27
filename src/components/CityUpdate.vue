<script setup>
import { nextTick, reactive } from 'vue'
import { updateCity } from '@/plugins/api.js'

const props = defineProps(['city'])
const emit = defineEmits(['cityUpdated'])
const state = reactive({ dialog: false, newCity: { ...props.city } })

function buttonSaveClick() {
  updateCity(state.newCity)
    .then(() => emit('cityUpdated'))
    .finally(() => (state.dialog = false))
}

function buttonCancelClick() {
  state.dialog = false
  nextTick(() => {
    state.newCity = { ...props.city }
  })
}
</script>
<template>
  <v-dialog v-model="state.dialog" persistent width="512">
    <template v-slot:activator="{ props }">
      <v-btn color="green" icon="mdi-pencil" size="x-small" v-bind="props" variant="plain"></v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit city</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="state.newCity.name" label="New city*" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="buttonCancelClick()"> Cancel</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="buttonSaveClick()"> Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
 </template>
