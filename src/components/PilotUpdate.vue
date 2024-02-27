<script setup>
import { nextTick, reactive } from 'vue'
import { getAirlines, updatePilot } from '@/plugins/api.js'

const props = defineProps(['pilot'])
const emit = defineEmits(['pilotUpdated'])
const state = reactive({ dialog: false, airlines: [], newPilot: { ...props.pilot } })

function buttonSaveClick() {
  updatePilot(state.newPilot)
    .then(() => emit('pilotUpdated'))
    .finally(() => (state.dialog = false))
}

function buttonCancelClick() {
  state.dialog = false
  nextTick(() => {
    state.newPilot = { ...props.pilot }
  })
}

function buttonOpenDialog() {
  if (state.airlines.length === 0) {
    getAirlines().then(
      (res) => (state.airlines = res.data.map((x) => ({ value: x.id, title: x.name })))
    )
  }
}
</script>

<template>
  <v-dialog v-model="state.dialog" persistent width="512">
    <template v-slot:activator="{ props }">
      <v-icon class="me-2" size="small" v-bind="props" @click="buttonOpenDialog">
        mdi-pencil
      </v-icon>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit pilot</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="state.newPilot.surName"
                label="Surname*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="state.newPilot.name" label="Name*" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="state.newPilot.age" label="Age*" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="state.newPilot.airlineId"
                :items="state.airlines"
                label="Airline*"
                placeholder="Select..."
                required
              ></v-autocomplete>
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
