<script setup>
import { onMounted, reactive } from 'vue'
import { getAirline, getAirlines } from '@/plugins/api.js'
import AirlineDelete from '@/components/AirlineDelete.vue'
import AirlineCreate from '@/components/AirlineCreate.vue'
import AirlineUpdate from '@/components/AirlineUpdate.vue'
import router from '@/router/index.js'

const state = reactive({
  airlines: [],
  headers: [
    { title: 'Airline name', key: 'name', align: 'start' },
    { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
  ]
})

function create(id) {
  getAirline(id).then((res) => state.airlines.push(res.data))
}

function update(id) {
  let index = state.airlines.findIndex((x) => x.id === id)
  getAirline(id).then((res) => (state.airlines[index] = res.data))
}

function remove(id) {
  let index = state.airlines.findIndex((x) => x.id === id)
  state.airlines.splice(index, 1)
}

function viewAirplanes(id) {
  router.push({ name: 'airlineAirplanes', params: { airlineId: id } })
}

onMounted(() => {
  getAirlines().then((res) => (state.airlines = res.data))
})
</script>

<template>
  <v-data-table
    :headers="state.headers"
    :items="state.airlines"
    :sort-by="[{ key: 'name', order: 'asc' }]"
    item-key="id"
  >
    <template v-slot:top>
      <v-toolbar color="white" flat>
        <v-toolbar-title>Airlines</v-toolbar-title>
        <v-spacer></v-spacer>
        <AirlineCreate @airline-created="(airlineId) => create(airlineId)" />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        color="red"
        icon="mdi-airplane"
        size="small"
        title="Airline airplanes"
        variant="plain"
        @click="viewAirplanes(item.id)"
      ></v-btn>
      <AirlineUpdate :airline="item" @airline-updated="() => update(item.id)" />
      <AirlineDelete :airline="item" @airline-deleted="() => remove(item.id)" />
    </template>
  </v-data-table>
</template>
