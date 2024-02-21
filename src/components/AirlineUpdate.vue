<script setup>
import { reactive } from 'vue'
import { updateAirline } from '@/plugins/api.js'

const props = defineProps(['airline'])
const emit = defineEmits(['airlineUpdated'])
const state = reactive({ dialog: false, newAirline: { ...props.airline } })

function buttonSaveClick() {
  updateAirline(state.newAirline)
    .then(() => emit('airlineUpdated'))
    .finally(() => (state.dialog = false))
}

function buttonCancelClick() {
  state.dialog = false
  this.$nextTick(() => {
    state.newAirline = { ...props.airline }
  })
}
</script>
<template>
  <v-dialog v-model="state.dialog" persistent width="512">
    <template v-slot:activator="{ props }">
      <v-btn
        color="green"
        icon="mdi-pencil"
        size="x-small"
        title="Update"
        v-bind="props"
        variant="plain"
      >
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit airline</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="state.newAirline.name"
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
        <v-btn color="blue-darken-1" variant="text" @click="buttonCancelClick()"> Cancel</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="buttonSaveClick()"> Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
