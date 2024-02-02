<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const newPilot = ref({ name: '', surName: '', age: null, id: 0, airlineId: null })
const allAirlines = ref([])
const dialog = ref(false)
const emit = defineEmits(['pilotAdd'])

function resetState() {
  newPilot.value.name = ''
  newPilot.value.surName = ''
  newPilot.value.age = null
  newPilot.value.airlineId = null
}

function pilotAdd() {
  axios
    .post('https://localhost:7294/Pilot', newPilot.value)
    .then((res) => {
      resetState()
      emit('pilotAdd', res.data)
    })
    .catch(function(error) {
      console.log(error)
    })
}

onMounted(() => {
  axios.get('https://localhost:7294/Airline').then((response) =>
    allAirlines.value = response.data.map(x => ({ value: x.id, title: x.name })
    ))
})
</script>

<template>

  <v-dialog
    v-model="dialog"
    persistent
    width="512"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        height="36"
        v-bind="props"
        variant="tonal"
      >
        Create pilot
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Введите данные пилота</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newPilot.surName"
                label="Surname*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newPilot.name"
                label="Name*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="newPilot.age"
                label="Age*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="newPilot.airlineId"
                :items="allAirlines"
                label="Airline"
                placeholder="Select..."
                required
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="pilotAdd(); dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


