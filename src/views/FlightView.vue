<script setup>
import { onMounted, reactive } from 'vue'
import { getFlight, getFlights } from '@/plugins/api.js'
import FlightCreate from '@/components/FlightCreate.vue'
import FlightDelete from '@/components/FlightDelete.vue'
import FlightUpdate from '@/components/FlightUpdate.vue'

const state = reactive({
  flights: [],
  headers: [
    { title: 'Number of flight', key: 'numberOfFlight', align: 'start' },
    { title: 'Departure time', key: 'departureTime' },
    { title: 'Arrival time', key: 'arrivalTime' },
    { title: 'From city', key: 'fromCity' },
    { title: 'To city', key: 'toCity' },
    { title: 'Airline name', key: 'airlineName' },
    { title: 'Airplane model', key: 'airplaneModel' },
    { title: 'Airplane serial number', key: 'airplaneSerialNumber' },
    { title: 'Pilot full name', key: 'pilotFullName' },
    { title: 'From terminal', key: 'fromTerminal' },
    { title: 'From gate', key: 'fromGate' },
    { title: 'To terminal', key: 'toTerminal' },
    { title: 'To gate', key: 'toGate' },
    { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
    /* ,{ title: 'Actual departure time', key: 'actualDepartureTime' },
     { title: 'Actual arrival time', key: 'actualArrivalTime' },
     { title: 'Check-in start time', key: 'checkInStartTime' },
     { title: 'Check-in end time', key: 'checkInEndTime' },
     { title: 'Boarding star time', key: 'boardingStartTime' },
     { title: 'Boarding end time', key: 'boardingEndTime' }*/


  ],
  menu1: false
})

function create(id) {
  console.log(id)
  getFlight(id).then((res) => state.flights.push(res.data))
}

function update(id) {
  let index = state.flights.findIndex((x) => x.id === id)
  getFlight(id).then((res) => (state.flights[index] = res.data))
}

function remove(id) {
  let index = state.flights.findIndex((x) => x.id === id)
  state.flights.splice(index, 1)
}

onMounted(() => {
  getFlights().then((res) => (state.flights = res.data))
})
</script>

<template>
  <v-data-table
    :headers="state.headers"
    :items="state.flights"
    :sort-by="[{ key: 'numberOfFlight', order: 'asc' }]"
    item-key="id"
  >
    <template v-slot:top>
      <v-toolbar color="white" flat>
        <v-toolbar-title>Flights</v-toolbar-title>
        <v-spacer></v-spacer>
        <FlightCreate @flight-created="(flightId) => create(flightId)" />
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <FlightUpdate :flight="item" @flight-updated="() => update(item.id)" />
      <FlightDelete :flight="item" @flight-deleted="() => remove(item.id)" />
    </template>
  </v-data-table>

</template>
<script>



</script>
