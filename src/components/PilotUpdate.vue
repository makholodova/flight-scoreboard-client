<script setup>
import { reactive } from 'vue'
import { updatePilot } from '@/plugins/api.js'
import { useAirlinesStore } from '@/store/useAirlinesStore.js'

const props = defineProps(['pilot'])
const emit = defineEmits(['pilotUpdated'])
const state = reactive({ dialog: false, newPilot: { ...props.pilot } })

const airlinesStore = useAirlinesStore()

function buttonSaveClick() {
  updatePilot(state.newPilot)
    .then(() => emit('pilotUpdated'))
    .finally(() => state.dialog = false)
}

function buttonCancelClick() {
  state.dialog = false
  state.newPilot = { ...props.pilot }
}

function buttonOpenDialog() {
  airlinesStore.load()
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
             @click="buttonOpenDialog"
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
                v-model="state.newPilot.surName"
                label="Surname"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="state.newPilot.name"
                label="Name*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="state.newPilot.age"
                label="Age*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="state.newPilot.airlineId"
                :items="airlinesStore.airlinesForAutocomplete"
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
