<script setup>
defineProps(['airline']) //url

import axios from 'axios'

const emit = defineEmits(['airlineDelete']) //onDelete

function buttonClick(id) { //url
  axios
    .delete(`https://localhost:7294/Airline/${id}`)
    .then(() => {
      emit('airlineDelete', id) //url or nothing
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>

  <v-btn icon="mdi-bucket"
         size="x-small"
         variant="plain"
         @click="buttonClick(airline.id)"
  >
  </v-btn> <!--url-->

</template>

<style scoped></style>
