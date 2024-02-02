<script>
import axios from 'axios'
import AirlineCreate from '@/components/AirlineCreate.vue'
import AirlineDelete from '@/components/AirlineDelete.vue'
import AirlineEdit from '@/components/AirlineEdit.vue'

export default {
  components: { AirlineEdit, AirlineDelete, AirlineCreate },

  data: () => ({
    airlines: []
  }),
  methods: {
    remove(index) {
      this.airlines.splice(index, 1)
    },
    add(airline) {
      this.airlines.push(airline)
    },
    edit(airline, index) {

      this.airlines[index] = airline
    }
  },
  mounted() {
    axios.get('https://localhost:7294/Airline').then((response) => (this.airlines = response.data))
  }
}

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

<style scoped>

</style>