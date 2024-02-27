<script setup>
import { nextTick, reactive } from 'vue'
import { createAirplane } from '@/plugins/api.js'

const emit = defineEmits(['airplaneCreated'])
const state = reactive({ dialog: false, newAirplane: {} })

function buttonCreateClick() {
  createAirplane(state.newAirplane)
    .then((res) => emit('airplaneCreated', res.data))
    .finally(() => buttonCancelClick())
}

function buttonCancelClick() {
  state.dialog = false
  nextTick(() => {
    state.newAirplane = {}
  })
}
</script>

<template>
  <v-dialog v-model="state.dialog" persistent width="512">
    <template v-slot:activator="{ props }">
      <v-btn height="36" v-bind="props" variant="tonal"> Create airplane</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">New airplane</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="state.newAirplane.model"
                label="New airplane*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="buttonCancelClick()"> Cancel</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="buttonCreateClick()"> Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
