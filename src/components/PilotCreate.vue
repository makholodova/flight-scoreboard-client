<script setup>
import { reactive } from 'vue'
import { createPilot, getAirlines } from '@/plugins/api.js'

const emit = defineEmits(['pilotCreated'])
const state = reactive({ dialog: false, airlines: [], newPilot: {} })

function buttonCreateClick() {
  createPilot(state.newPilot)
    .then(res => emit('pilotCreated', res.data))
    .finally(() => buttonCancelClick())
}

function buttonCancelClick() {
  state.dialog = false
  state.newPilot = {}
}

function buttonOpenDialog() {
  if (state.airlines.length === 0) {
    getAirlines()
      .then(res => state.airlines = res.data.map(x => ({ value: x.id, title: x.name })))
  }
}
</script>

<template>
  <v-dialog
    v-model="state.dialog"
    persistent
    width="512"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        height="36"
        v-bind="props"
        variant="tonal"
        @click="buttonOpenDialog"
      >
        Create pilot
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Введите данные пилота</span>
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
              <v-text-field
                v-model="state.newPilot.name"
                label="Name*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="state.newPilot.age"
                label="Age*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="state.newPilot.airlineId"
                :items="state.airlines"
                label="Airline"
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
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="buttonCancelClick()"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="buttonCreateClick()"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


