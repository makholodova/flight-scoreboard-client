<script setup>
import { reactive } from 'vue'
import { createAirline } from '@/plugins/api.js'

const emit = defineEmits(['airlineCreated'])
const state = reactive({ dialog: false, newAirline: {} })

function buttonCreateClick() {
  createAirline(state.newAirline)
    .then((res) => emit('airlineCreated', res.data))
    .finally(() => buttonCancelClick())
}

function buttonCancelClick() {
  state.dialog = false
  this.$nextTick(() => {
    state.newAirline = {}
  })
}
</script>

<template>
  <v-dialog v-model="state.dialog" persistent width="512">
    <template v-slot:activator="{ props }">
      <v-btn height="36" v-bind="props" variant="tonal"> Create airline</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">New airline</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="state.newAirline.name"
                label="New airline*"
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
