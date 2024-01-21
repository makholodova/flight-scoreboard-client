<script setup>
defineProps(['city'])

import axios from 'axios'

const emit = defineEmits(['cityDelete'])

function buttonClick(id) {
  axios.delete(`https://localhost:7294/City/${id}`)
    .then(res => {
      emit('cityDelete', id)
    })
    .catch(error => {
      console.log(error)
    })
}
</script>

<template>
  <button @click="buttonClick(city.id)">Delete</button>
</template>

<style scoped>

</style>