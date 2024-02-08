<script setup>
import { onMounted, reactive } from 'vue'
import { getPilot, getPilots } from '@/plugins/api.js'
import PilotCreate from '@/components/PilotCreate.vue'
import PilotUpdate from '@/components/PilotUpdate.vue'
import PilotDelete from '@/components/PilotDelete.vue'

const state = reactive({
  pilots: [],
  headers: [
    { title: 'Surname', key: 'surName', align: 'start' },
    { title: 'Name', key: 'name' },
    { title: 'Age', key: 'age' },
    { title: 'Airline', key: 'airlineName' },
    { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
  ]
})

function create(id) {
  getPilot(id).then(res => state.pilots.push(res.data))
}

function update(id) {
  let index = state.pilots.findIndex((x) => x.id === id)
  getPilot(id).then(res => state.pilots[index] = res.data)
}

function remove(id) {
  let index = state.pilots.findIndex((x) => x.id === id)
  state.pilots.splice(index, 1)
}

onMounted(() => {
  getPilots().then(res => state.pilots = res.data)
})
</script>

<template>
  <v-data-table
    :headers="state.headers"
    :items="state.pilots"
    :sort-by="[{ key: 'surName', order: 'asc' }]"
    item-key="id"
  >
    <template v-slot:top>
      <v-toolbar
        color="white"
        flat
      >
        <v-toolbar-title>Pilots</v-toolbar-title>
        <v-spacer></v-spacer>
        <PilotCreate @pilot-created="(pilotId) => create(pilotId)" />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <PilotUpdate :pilot="item" @pilot-updated="()=> update(item.id)" />
      <PilotDelete :pilot="item" @pilot-deleted="() =>remove(item.id)" />
    </template>
  </v-data-table>
</template>
