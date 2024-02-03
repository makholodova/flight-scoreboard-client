<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CityDelete from '@/components/CityDelete.vue'
import CityEdit from '@/components/CityEdit.vue'
import CityCreate from '@/components/CityCreate.vue'

const cities = ref([])

function remove(index) {
  cities.value.splice(index, 1)
}

function add(city) {
  cities.value.push(city)
}

function edit(city, index) {

  cities.value[index] = city
}

onMounted(() => {
  axios.get('https://localhost:7294/City').then((response) => (cities.value = response.data))
})
</script>

<template>
  <v-list>
    <v-list-item-title> Города:</v-list-item-title>
    <v-list-item
      v-for="(city, index) in cities"
      :key="city.id"
    >
      {{ city.name }}
      <CityDelete :city="city" @city-delete="(id) => remove(index)" />
      <CityEdit :city="city" @city-edit="(city)=> edit(city,index)" />
    </v-list-item>
  </v-list>
  <div>
    <CityCreate @city-add="(city) => add(city)" />
  </div>
</template>
