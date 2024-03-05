<script setup>

import { parseDateString } from '@/plugins/dateHelpers.js'
import { onMounted, reactive } from 'vue'
import { getDepartureFlights } from '@/plugins/api.js'

const state = reactive({
  flights: [],
  headers: [
    { title: 'Airline name', key: 'airlineName' },
    { title: 'Number of flight', key: 'numberOfFlight', align: 'start' },
    { title: 'Airplane model', key: 'airplaneModel' },
    { title: 'To city', key: 'toCity' },
    { title: 'Departure time', key: 'departureTime' },
    { title: 'Terminal', key: 'terminal' },
    { title: 'Gate', key: 'gate' },
    { title: 'Status', key: 'statusMessage' }
  ]
})

onMounted(() => {
  getDepartureFlights().then((res) => (state.flights = res.data))
})
</script>
<template>
  <v-data-table
    :headers="state.headers"
    :items="state.flights"
    :sort-by="[{ key: 'departureTime', order: 'asc' }]"
    item-key="id"
  >
    <template v-slot:top>
      <v-toolbar color="white" flat>
        <v-toolbar-title>Departure flights</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.departureTime="{ value }">
      {{ parseDateString(value) }}
    </template>
  </v-data-table>
</template>