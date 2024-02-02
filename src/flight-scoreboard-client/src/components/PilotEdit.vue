<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const dialog = ref(false)
const emit = defineEmits(['pilotEdit'])
const airlines = ref([])
const props = defineProps(['pilot'])

const newPilot = ref({
  name: props.pilot.name,
  surName: props.pilot.surName,
  age: props.pilot.age,
  airlineId: props.pilot.airlineId,
  id: props.pilot.id
})

function pilotEdit() {
  axios
    .put('https://localhost:7294/Pilot', newPilot.value)
    .then((res) => {
      console.log(res.data)
      emit('pilotEdit', res.data)
    })
    .catch(function(error) {
      console.log(error)
    })
}

onMounted(() => {
  axios.get('https://localhost:7294/Airline').then((response) =>
    airlines.value = response.data.map(x => ({ value: x.id, title: x.name })
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
      <v-btn color="green"
             icon="mdi-pencil"
             size="x-small"
             v-bind="props"
             variant="plain"
      >
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
                label="Surname"
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
                :items="airlines"
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
          @click="pilotEdit(); dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
