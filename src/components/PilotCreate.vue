<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['pilotCreate'])

const dialog = ref(false)
const allAirlines = ref([])
const newPilot = ref({ name: '', surName: '', age: null, id: 0, airlineId: null })

function resetState() {
  newPilot.value.name = ''
  newPilot.value.surName = ''
  newPilot.value.age = null
  newPilot.value.airlineId = null
}

function buttonCreateClick() {
  axios
    .post('https://localhost:7294/Pilot', newPilot.value)
    .then(res => {
      resetState()
      emit('pilotCreate', res.data)
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => dialog.value = false)
}

onMounted(() => {
  axios.get('https://localhost:7294/Airline')
    .then(res => allAirlines.value = res.data.map(x => ({ value: x.id, title: x.name })))
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
          @click="buttonCreateClick()"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


