<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import AirlineDelete from '@/components/AirlineDelete.vue'
import AirlineEdit from '@/components/AirlineEdit.vue'
import AirlineCreate from '@/components/AirlineCreate.vue'

const airlines = ref([])

function remove(index) {
  airlines.value.splice(index, 1)
}

function add(airline) {
  airlines.value.push(airline)
}

function edit(airline, index) {

  airlines.value[index] = airline
}

onMounted(() => {
  axios.get('https://localhost:7294/Airline').then((response) => (airlines.value = response.data))
})

</script>

<template>
  <v-list>
    <v-list-item-title> Авиакомпании:</v-list-item-title>
    <v-list-item
      v-for="(airline, index) in airlines"
      :key="airline.id"
    >
      {{ airline.name }}
      <AirlineDelete :airline="airline" @airline-delete="(id) => remove(index)" />
      <AirlineEdit :airline="airline" @airline-edit="(airline)=> edit(airline,index)" />
    </v-list-item>
  </v-list>
  <div>
    <AirlineCreate @airline-add="(airline) => add(airline)" />
  </div>
</template>
