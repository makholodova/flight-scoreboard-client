<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import PilotCreate from '@/components/PilotCreate.vue'
import PilotDelete from '@/components/PilotDelete.vue'
import PilotEdit from '@/components/PilotEdit.vue'

const pilots = ref([])

function create(id) {
  axios.get(`https://localhost:7294/Pilot/${id}`)
    .then(res => pilots.value.push(res.data))
    .catch(error => {
      console.log(error)
    })
}

function edit(isUpdated, id, index) {
  if (isUpdated) {
    axios.get(`https://localhost:7294/Pilot/${id}`)
      .then(res => pilots.value[index] = res.data)
      .catch(error => {
        console.log(error)
      })
  }
}

function remove(isDeleted, index) {
  if (isDeleted) {
    pilots.value.splice(index, 1)
  }
}

onMounted(() => {
  axios.get('https://localhost:7294/Pilot').then(res => pilots.value = res.data)
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
      <PilotDelete :pilot="pilot" @pilot-delete="(isDeleted) => remove(isDeleted, index)" />
      <PilotEdit :pilot="pilot" @pilot-edit="(isUpdated)=> edit(isUpdated, pilot.id, index)" />
    </v-list-item>
  </v-list>
  <div>
    <PilotCreate @pilot-create="(pilotId) => create(pilotId)" />
  </div>
</template>