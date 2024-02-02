<script setup>
import { ref } from 'vue'

const dialog = ref(false)

const emit = defineEmits(['airlineEdit'])

const props = defineProps(['airline'])

const newAirline = ref({ name: props.airline.name, id: props.airline.id })

function airlineEdit() {

  let obj = { name: newAirline.value.name, id: newAirline.value.id }
  console.log(newAirline.value)
  /*  console.log(newCity2)*/
  emit('airlineEdit', obj)

  /*axios
    .post('https://localhost:7294/City', newCity.value) 
    .then((res) => {
      newCity.value.name = ''
      obj.id = res.data
      emit('cityEdit', obj)
    })
    .catch(function(error) {
      console.log(error)
    })*/
}


</script>

<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="512"
  >
    <template v-slot:activator="{ props }">

      <v-btn color="green"
             size="x-small"
             v-bind="props"
             variant="plain"
             icon="mdi-pencil"
      >
        
      </v-btn>

    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Введите название авиакомпании</span>
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
          @click="airlineEdit(); dialog = false"
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
<style scoped>

</style>