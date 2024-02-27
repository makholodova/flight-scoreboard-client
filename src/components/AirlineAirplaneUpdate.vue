<script setup>
import { nextTick, reactive } from 'vue'
import { getAirplanes, updateAirlineAirplane } from '@/plugins/api.js'

const props = defineProps(['airlineAirplane'])
const emit = defineEmits(['airlineAirplaneUpdated'])
const state = reactive({
  dialog: false,
  airlines: [],
  airplanes: [],
  newAirlineAirplane: { ...props.airlineAirplane }
})

function buttonSaveClick() {
  updateAirlineAirplane(state.newAirlineAirplane.airlineId, state.newAirlineAirplane)
    .then(() => emit('airlineAirplaneUpdated'))
    .finally(() => (state.dialog = false))
}

function buttonCancelClick() {
  state.dialog = false
  nextTick(() => {
    state.newAirlineAirplane = { ...props.airlineAirplane }
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
      <v-icon class="me-2" size="small" title="Update" v-bind="props" @click="buttonOpenDialog">
        mdi-pencil
      </v-icon>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit airline airplane</span>
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
        <v-btn color="blue-darken-1" variant="text" @click="buttonSaveClick()"> Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
