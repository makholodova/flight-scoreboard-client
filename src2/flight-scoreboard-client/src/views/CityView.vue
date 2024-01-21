<script>
import axios from 'axios'
import CityForm from '@/components/CityForm.vue'
import CityDelete from '@/components/CityDelete.vue'

export default {
  components: { CityDelete, CityForm },

  data: () => ({
    cities: []
  }),
  methods: {
    remove(index) {
      this.cities.splice(index, 1)
    },
    add(city) {
      this.cities.push(city)
    }
  },
  mounted() {
    axios
      .get('https://localhost:7294/City')
      .then(response => (this.cities = response.data))
  }
}

</script>

<template>

  <div><h2>Список городов</h2>
    <div v-for="(city, index) in cities">
      <p>{{ city.name }} {{ city.id }}
        <CityDelete :city="city"
                    @city-delete="id => remove(index)" />
      </p>
    </div>
    <div>
      <CityForm @city-add='(city) => add(city)' />
    </div>
  </div>

</template>
