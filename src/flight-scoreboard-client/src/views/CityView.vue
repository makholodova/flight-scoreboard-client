



<script>
import axios from 'axios'
import CityCreate from '@/components/CityCreate.vue'
import CityDelete from '@/components/CityDelete.vue'
import CityEdit from '@/components/CityEdit.vue'

export default {
  components: { CityEdit, CityDelete, CityCreate },

  data: () => ({
    cities: []

  }),
  methods: {
    remove(index) {
      this.cities.splice(index, 1)
    },
    add(city) {
      this.cities.push(city)
    },
    edit(city, index) {

      this.cities[index] = city
    }
  },
  mounted() {
    axios.get('https://localhost:7294/City').then((response) => (this.cities = response.data))
  }
}
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
