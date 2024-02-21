<script setup>
import { onMounted, reactive } from 'vue'
import { getAirplane, getAirplanes } from '@/plugins/api.js'
import AirplaneDelete from '@/components/AirplaneDelete.vue'
import AirplaneCreate from '@/components/AirplaneCreate.vue'
import AirplaneUpdate from '@/components/AirplaneUpdate.vue'

const state = reactive({
  airplanes: [],
  headers: [
    { title: 'Airplane name', key: 'model', align: 'start' },
    { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
  ]
})

function create(id) {
  getAirplane(id).then((res) => state.airplanes.push(res.data))
}

function update(id) {
  let index = state.airplanes.findIndex((x) => x.id === id)
  getAirplane(id).then((res) => (state.airplanes[index] = res.data))
}

function remove(id) {
  let index = state.airplanes.findIndex((x) => x.id === id)
  state.airplanes.splice(index, 1)
}

onMounted(() => {
  getAirplanes().then((res) => (state.airplanes = res.data))
})
</script>

<template>
  <v-data-table
    :headers="state.headers"
    :items="state.airplanes"
    :sort-by="[{ key: 'model', order: 'asc' }]"
    item-key="id"
  >
    <template v-slot:top>
      <v-toolbar color="white" flat>
        <v-toolbar-title>Airplanes</v-toolbar-title>
        <v-spacer></v-spacer>
        <AirplaneCreate @airplane-created="(airplaneId) => create(airplaneId)" />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <AirplaneUpdate :airplane="item" @airplane-updated="() => update(item.id)" />
      <AirplaneDelete :airplane="item" @airplane-deleted="() => remove(item.id)" />
    </template>
  </v-data-table>
</template>
