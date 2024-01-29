<script setup>
import { reactive, ref } from 'vue'

const dialog = ref(false)

const emit = defineEmits(['cityEdit'])

const props = defineProps(['city'])

const newCity = ref({ name: props.city.name, id: props.city.id })
/*const newCity2 = reactive({ name: props.city.name, id: props.city.id })*/


function cityEdit() {

  
  let obj = { name: newCity.value.name, id: newCity.value.id }
  console.log(newCity.value)
/*  console.log(newCity2)*/
  emit('cityEdit', obj)

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
  <!--  <v-row justify="center">-->
  <v-dialog
    v-model="dialog"
    persistent
    width="512"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
      >
        Change city
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Введите название города</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newCity.name"
                label="New city*"
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
          @click="cityEdit(); dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!--  </v-row>-->
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