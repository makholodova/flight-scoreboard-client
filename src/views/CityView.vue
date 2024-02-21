<script setup>
import { onMounted, reactive } from 'vue'
import { getCities, getCity } from '@/plugins/api.js'
import CityCreate from '@/components/CityCreate.vue'
import CityUpdate from '@/components/CityUpdate.vue'
import CityDelete from '@/components/CityDelete.vue'

const state = reactive({
  cities: [],
  headers: [
    { title: 'City name', key: 'name', align: 'start' },
    { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
  ]
})

function create(id) {
  getCity(id).then((res) => state.cities.push(res.data))
}

function update(id) {
  let index = state.cities.findIndex((x) => x.id === id)
  getCity(id).then((res) => (state.cities[index] = res.data))
}

function remove(id) {
  let index = state.cities.findIndex((x) => x.id === id)
  state.cities.splice(index, 1)
}

onMounted(() => {
  getCities().then((res) => (state.cities = res.data))
})
</script>

<template>
  <v-data-table
    :headers="state.headers"
    :items="state.cities"
    :sort-by="[{ key: 'name', order: 'asc' }]"
    item-key="id"
  >
    <template v-slot:top>
      <v-toolbar color="white" flat>
        <v-toolbar-title>Cities</v-toolbar-title>
        <v-spacer></v-spacer>
        <CityCreate @city-created="(cityId) => create(cityId)" />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <CityUpdate :city="item" @city-updated="() => update(item.id)" />
      <CityDelete :city="item" @city-deleted="() => remove(item.id)" />
    </template>
  </v-data-table>
</template>
