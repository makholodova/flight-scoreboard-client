<script setup>
defineProps(['pilot']) //url

import axios from 'axios'

const emit = defineEmits(['pilotDelete']) //onDelete

function buttonClick(id) { //url
  axios
    .delete(`https://localhost:7294/Pilot/${id}`)
    .then(() => {
      emit('pilotDelete', id) //url or nothing
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>

  <v-btn size="x-small"
         variant="plain"
         @click="buttonClick(pilot.id)"
         icon="mdi-bucket"
  >
  </v-btn> <!--url-->


</template>

<style scoped></style>
