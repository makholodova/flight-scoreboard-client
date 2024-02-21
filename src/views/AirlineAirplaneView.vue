<script setup>
import { onMounted, reactive } from 'vue'
import { getAirlineAirplane, getAirlineAirplanes } from '@/plugins/api.js'
import AirlineAirplaneCreate from '@/components/AirlineAirplaneCreate.vue'
import AirlineAirplaneUpdate from '@/components/AirlineAirplaneUpdate.vue'
import AirlineAirplaneDelete from '@/components/AirlineAirplaneDelete.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const airlineId = route.params.airlineId

const state = reactive({
  airlineAirplanes: [],
  headers: [
    { title: 'Airline Name', key: 'airlineName' },
    { title: 'Airplane Model', key: 'airplaneModel', align: 'start' },
    { title: 'Serial Number', key: 'serialNumber' },
    { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
  ]
})

function create(airplaneId) {
  getAirlineAirplane(airlineId, airplaneId).then((res) => state.airlineAirplanes.push(res.data))
}

function update(airplaneId) {
  let index = state.airlineAirplanes.findIndex((x) => x.id === airplaneId)
  getAirlineAirplane(airlineId, airplaneId).then(
    (res) => (state.airlineAirplanes[index] = res.data)
  )
}

function remove(id) {
  let index = state.airlineAirplanes.findIndex((x) => x.id === id)
  state.airlineAirplanes.splice(index, 1)
}

onMounted(() => {
  getAirlineAirplanes(airlineId).then((res) => (state.airlineAirplanes = res.data))
})
</script>

<template>
  <v-data-table
    :headers="state.headers"
    :items="state.airlineAirplanes"
    :sort-by="[{ key: 'airlineName', order: 'asc' }]"
    item-key="id"
  >
    <template v-slot:top>
      <v-toolbar color="white" flat>
        <v-toolbar-title>Airline airplanes</v-toolbar-title>
        <v-spacer></v-spacer>
        <AirlineAirplaneCreate
          :airlineId="airlineId"
          @airlineAirplane-created="(airlineAirplaneId) => create(airlineAirplaneId)"
        />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <AirlineAirplaneUpdate
        :airlineAirplane="item"
        @airlineAirplane-updated="() => update(item.id)"
      />
      <AirlineAirplaneDelete
        :airlineAirplane="item"
        @airlineAirplane-deleted="() => remove(item.id)"
      />
    </template>
  </v-data-table>
</template>
