<script setup>
import { ref } from 'vue'
import axios from 'axios'

const newAirline = ref({ name: '', id: 0 })
const dialog = ref(false)
const emit = defineEmits(['airlineAdd'])

function resetState() {
  newAirline.value.name = ''
}

function airlineAdd() {
  let obj = { name: newAirline.value.name }
  axios
    .post('https://localhost:7294/Airline', newAirline.value)
    .then((res) => {
      resetState()
      obj.id = res.data
      emit('airlineAdd', obj)
    })
    .catch(function(error) {
      console.log(error)
    })
}

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
        Create airline
      </v-btn>

    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Введите название авиалинии</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newAirline.name"
                label="New airline*"
                required
              ></v-text-field>
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
          @click="airlineAdd(); dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
}
</script>


<style scoped></style>
