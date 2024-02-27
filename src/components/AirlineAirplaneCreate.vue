<script setup>
import { nextTick, reactive } from 'vue'
import { createAirlineAirplane, getAirplanes } from '@/plugins/api.js'

const props = defineProps(['airlineId'])
const emit = defineEmits(['airlineAirplaneCreated'])
const state = reactive({ dialog: false, airplanes: [], newAirlineAirplane: {} })

function buttonCreateClick() {
  createAirlineAirplane(props.airlineId, state.newAirlineAirplane)
    .then((res) => emit('airlineAirplaneCreated', res.data))
    .finally(() => buttonCancelClick())
}

function buttonCancelClick() {
  state.dialog = false
  nextTick(() => {
    state.newAirlineAirplane = {}
  })
}

function buttonOpenDialog() {
  if (state.airplanes.length === 0) {
    getAirplanes().then(
      (res) => (state.airplanes = res.data.map((x) => ({ value: x.id, title: x.model })))
    )
  }
}
</script>

<template>
  <v-dialog v-model="state.dialog" persistent width="512">
    <template v-slot:activator="{ props }">
      <v-btn class="mb-2" v-bind="props" variant="tonal" @click="buttonOpenDialog">
        Create airplane
      </v-btn>
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
                v-model="state.newAirlineAirplane.serialNumber"
                label="Serial Number*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                v-model="state.newAirlineAirplane.airplaneId"
                :items="state.airplanes"
                label="Airplane*"
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
        <v-btn color="blue-darken-1" variant="text" @click="buttonCreateClick()"> Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
