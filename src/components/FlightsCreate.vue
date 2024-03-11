<script setup>
import { nextTick, reactive } from 'vue'
import { vMaska } from 'maska'
import { createFlights, getAirlineAirplanes, getAirlines, getCities, getPilotsByAirlineId } from '@/plugins/api.js'

const props = defineProps(['airlineId'])
const emit = defineEmits(['flightsCreated'])
const state = reactive({
  dialog: false,
  cities: [],
  airlines: [],
  airplanes: [],
  pilots: [],
  newFlight: { daysOfWeek: [] },
  tab: 'datetime'

  /*rules: [
    value => {
      if (value) return true

      return 'You must enter a first name.'
    }]*/
})
const maskaTimeOptions = { mask: '##:##:00' }

function buttonCreateClick() {
  console.log(state.newFlight)
  createFlights(state.newFlight)
    .then((res) => emit('flightsCreated', res.data))
    .finally(() => buttonCancelClick())
}

function buttonCancelClick() {
  state.dialog = false
  nextTick(() => {
    state.newFlight = {}
  })
}

function airlineSelect(airlineId) {
  state.newFlight.pilotId = null
  state.newFlight.airlineAirplaneId = null

  getAirlineAirplanes(airlineId).then(
    (res) => (state.airplanes = res.data.map((x) => ({ value: x.id, title: x.airplaneModel })))
  )

  getPilotsByAirlineId(airlineId).then(
    (res) => (state.pilots = res.data.map((x) => ({ value: x.id, title: (x.surName + ' ' + x.name) })))
  )
}

function buttonOpenDialog() {
  if (state.cities.length === 0) {
    getCities().then(
      res => (state.cities = res.data.map((x) => ({ value: x.id, title: x.name }))))
  }
  if (state.airlines.length === 0) {
    getAirlines().then(
      res => (state.airlines = res.data.map((x) => ({ value: x.id, title: x.name }))))
  }
}
</script>

<template>
  <v-dialog v-model="state.dialog" persistent width="700">
    <template v-slot:activator="{ props }">
      <v-btn class="mb-2" v-bind="props" variant="tonal" @click="buttonOpenDialog">
        Create flights
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">New flights by schedule</span>
      </v-card-title>
      <v-card-text>
        <v-card>
          <v-tabs
            v-model="state.tab"
            color="blue-darken-1"
          >
            <v-tab value="datetime">
              Date and time
            </v-tab>
            <v-tab value="main">
              Main
            </v-tab>
            <v-tab value="terminalAndGate">
              Terminal and gate
            </v-tab>

          </v-tabs>
          <v-window v-model="state.tab">
            <v-window-item value="datetime">
              <v-container>
                <v-row>
                  <v-checkbox
                    v-model="state.newFlight.daysOfWeek "
                    center-affix
                    label="Monday"
                    value="Monday"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.newFlight.daysOfWeek "
                    label="Tuesday"
                    value="Tuesday"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.newFlight.daysOfWeek "
                    label="Wednesday"
                    value="Wednesday"
                  ></v-checkbox>
                </v-row>

                <v-row>
                  <v-checkbox
                    v-model="state.newFlight.daysOfWeek "
                    label="Thursday"
                    value="Thursday"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.newFlight.daysOfWeek "
                    label="Friday"
                    value="Friday"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.newFlight.daysOfWeek "
                    label="Saturday"
                    value="Saturday"
                  ></v-checkbox>
                </v-row>
                <v-row>
                  <v-checkbox
                    v-model="state.newFlight.daysOfWeek "
                    label="Sunday"
                    value="Sunday"
                  ></v-checkbox>
                </v-row>
                <v-row>
                  <v-col cols="6">                                             <!--  :rules="state.rules"-->
                    <v-text-field
                      v-model="state.newFlight.startDay"
                      label="Start day*"
                      required
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="state.newFlight.finishDay"
                      label="Finish day*"
                      required
                      type="date"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="state.newFlight.departureTime"
                      v-maska:[maskaTimeOptions]
                      label="Departure time*"
                      required
                      type="text"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="state.newFlight.durationTime"
                      v-maska:[maskaTimeOptions]
                      label="Duration time*"
                      required
                      type="text"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-window-item>
            <v-window-item value="main">
              <v-container>
                <v-row>
                  <v-col cols="6">                                             <!--  :rules="state.rules"-->
                    <v-text-field
                      v-model="state.newFlight.numberOfFlight"
                      label="Number of flights*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="state.newFlight.airlineId"
                      :items="state.airlines"
                      label="Airline name*"
                      placeholder="Select..."
                      required
                      @update:modelValue="airlineSelect"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="state.newFlight.airlineAirplaneId"
                      :items="state.airplanes"
                      label="Airplane name*"
                      placeholder="Select..."
                      required
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="state.newFlight.pilotId"
                      :items="state.pilots"
                      label="Pilot* "
                      placeholder="Select..."
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="state.newFlight.fromCityId"
                      :items="state.cities"
                      label="From city*"
                      placeholder="Select..."
                      required
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="state.newFlight.toCityId"
                      :items="state.cities"
                      label="To city*"
                      placeholder="Select..."
                      required
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-window-item>
            <v-window-item value="terminalAndGate">
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="state.newFlight.fromTerminal"
                      label="From terminal "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="state.newFlight.toTerminal"
                      label="To terminal "
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="state.newFlight.fromGate"
                      label="From gate "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="state.newFlight.toGate"
                      label="To gate"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
            
          </v-window>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="buttonCancelClick()"> Cancel</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="buttonCreateClick()"> Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

