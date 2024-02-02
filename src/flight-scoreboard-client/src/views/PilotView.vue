<script>
import axios from 'axios'
import PilotCreate from '@/components/PilotCreate.vue'
import PilotDelete from '@/components/PilotDelete.vue'
import PilotEdit from '@/components/PilotEdit.vue'

export default {
  components: { PilotEdit, PilotDelete, PilotCreate },
  data: () => ({
    pilots: []
  }),
  methods: {
    remove(index) {
      this.pilots.splice(index, 1)
    },
    add(id) {
      axios.get(`https://localhost:7294/Pilot/${id}`)
        .then((response) => (this.pilots.push(response.data)))
    },
    edit(isUpdated, id, index) {
      if (isUpdated) {
        axios.get(`https://localhost:7294/Pilot/${id}`)
          .then((response) => (this.pilots[index] = response.data))
      }
    }
  },
  mounted() {
    axios.get('https://localhost:7294/Pilot').then((response) => (this.pilots = response.data))
  }
}
</script>

<template>
  <v-list>
    <v-list-item-title> Список пилотов:</v-list-item-title>
    <v-list-item
      v-for="(pilot, index) in pilots"
      :key="pilot.id"
    >
      {{ pilot.surName }} {{ pilot.name }} {{ pilot.age }} {{ pilot.airlineName }}
      <PilotDelete :pilot="pilot" @pilot-delete="(id) => remove(index)" />
      <PilotEdit :pilot="pilot" @pilot-edit="(isUpdated)=> edit(isUpdated,pilot.id,index)" />
    </v-list-item>
  </v-list>
  <div>
    <PilotCreate @pilot-add="(pilotId) => add(pilotId)" />
  </div>
</template>

<style scoped>
</style>