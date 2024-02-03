<script setup>
import { onMounted, reactive } from 'vue'
import { getPilot, getPilots } from '@/plugins/api.js'
import PilotCreate from '@/components/PilotCreate.vue'
import PilotUpdate from '@/components/PilotUpdate.vue'
import PilotDelete from '@/components/PilotDelete.vue'

const state = reactive({ pilots: [] })

function create(id) {
  getPilot(id).then(res => state.pilots.push(res.data))
}

function update(id, index) {
  getPilot(id).then(res => state.pilots[index] = res.data)
}

function remove(index) {
  state.pilots.splice(index, 1)
}

onMounted(() => {
  getPilots().then(res => state.pilots = res.data)
})
</script>

<template>
  <v-list>
    <v-list-item-title>Список пилотов:</v-list-item-title>
    <v-list-item
      v-for="(pilot, index) in state.pilots"
      :key="pilot.id"
    >
      {{ pilot.surName }} {{ pilot.name }} {{ pilot.age }} {{ pilot.airlineName }}
      <PilotUpdate :pilot="pilot" @pilot-updated="()=> update(pilot.id, index)" />
      <PilotDelete :pilot="pilot" @pilot-deleted="() => remove(index)" />
    </v-list-item>
  </v-list>
  <div>
    <PilotCreate @pilot-created="(pilotId) => create(pilotId)" />
  </div>
</template>