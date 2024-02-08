<script setup>
import { deletePilot } from '@/plugins/api.js'

defineProps(['pilot'])
const emit = defineEmits(['pilotDeleted'])

function buttonClick(id) {
  deletePilot(id).then(() => emit('pilotDeleted'))
}
</script>
<!--<v-dialog v-model="dialogDelete" max-width="500px">
<v-card>
  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
    <v-spacer></v-spacer>
  </v-card-actions>
</v-card>
</v-dialog>-->
<template>
  <!--  <v-btn icon="mdi-bucket"
           size="x-small"
           variant="plain"
           @click="buttonClick(pilot.id)"
    >
    </v-btn>-->
  <v-icon
    size="small"
    @click="buttonClick(pilot.id)"
  >
    mdi-delete
  </v-icon>
</template>