<script setup>
import { reactive } from 'vue'
import { updateAirplane } from '@/plugins/api.js'

const props = defineProps(['airplane'])
const emit = defineEmits(['airplaneUpdated'])
const state = reactive({ dialog: false, newAirplane: { ...props.airplane } })

function buttonSaveClick() {
  updateAirplane(state.newAirplane)
    .then(() => emit('airplaneUpdated'))
    .finally(() => state.dialog = false)
}

function buttonCancelClick() {
  state.dialog = false
  state.newAirplane = { ...props.airplane }
}

</script>
<template>
  <v-dialog
    v-model="state.dialog"
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
        <span class="text-h5">Edit airplane</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="state.newAirplane.model"
                label="New airplane*"
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
          @click="buttonCancelClick()"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="buttonSaveClick()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
