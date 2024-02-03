<script setup>
import axios from 'axios'

defineProps(['pilot'])
const emit = defineEmits(['pilotDelete'])

function buttonClick(id) {
  axios
    .delete(`https://localhost:7294/Pilot/${id}`)
    .then(() => {
      emit('pilotDelete', true)
    })
    .catch(error => {
      console.log(error)
      emit('pilotDelete', false)
    })
}
</script>

<template>
  <v-btn icon="mdi-bucket"
         size="x-small"
         variant="plain"
         @click="buttonClick(pilot.id)"
  >
  </v-btn>
</template>
