<script setup>
defineProps(['city'])

import axios from 'axios'

const emit = defineEmits(['cityDelete'])

function buttonClick(id) {
  axios
    .delete(`https://localhost:7294/City/${id}`)
    .then(() => {
      emit('cityDelete', id)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>

  <v-btn
    icon="mdi-bucket"
    size="x-small"
    variant="plain"
    @click="buttonClick(city.id)"
  >  
  </v-btn>


</template>

<style scoped></style>
