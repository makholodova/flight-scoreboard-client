<script setup>
import { ref } from 'vue'
import axios from 'axios'

// state
const newCity = ref({ name: '', id: 0 })

//defineProps(['cities'])
const emit = defineEmits(['cityAdd'])

function cityAdd() {

  /* emit('cityAdd', newCity.value);*/
  let obj = { name: newCity.value.name }
  axios.post('https://localhost:7294/City', newCity.value) ////не работает
    .then(res => {
      newCity.value.name = ''
      obj.id = res.data
      emit('cityAdd', obj)
    })
    .catch(function(error) {
      console.log(error)
    })
}

</script>

<template>
  <div>
    <input v-model="newCity.name" type="text" />
    <button @click="cityAdd()">Создать город</button>
  </div>
</template>

<style scoped>

</style>