<script setup>
import { onMounted, ref } from 'vue'
import { getPilot, getPilots } from '@/plugins/api.js'
import PilotCreate from '@/components/PilotCreate.vue'
import PilotUpdate from '@/components/PilotUpdate.vue'
import PilotDelete from '@/components/PilotDelete.vue'

const pilots = ref([])

function create(id) {
  getPilot(id).then(res => pilots.value.push(res.data))
}

function update(id, index) {
  getPilot(id).then(res => pilots.value[index] = res.data)
}

function remove(index) {
  pilots.value.splice(index, 1)
}

onMounted(() => {
  getPilots().then(res => pilots.value = res.data)
})
</script>

<template>
  <v-list>
    <v-list-item-title>Список пилотов:</v-list-item-title>
    <v-list-item
      v-for="(pilot, index) in pilots"
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