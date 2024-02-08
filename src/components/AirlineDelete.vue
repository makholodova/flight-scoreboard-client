<script setup>
import { deleteAirline } from '@/plugins/api.js'

defineProps(['airline'])
const emit = defineEmits(['airlineDeleted'])

function buttonClick(id) {
  deleteAirline(id).then(() => emit('airlineDeleted'))
}
</script>

<template>
  <v-btn icon="mdi-bucket"
         size="x-small"
         variant="plain"
         @click="buttonClick(airline.id)"
  >
  </v-btn>
</template>