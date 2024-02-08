<script setup>
import { deleteAirplane } from '@/plugins/api.js'

defineProps(['airplane'])
const emit = defineEmits(['airplaneDeleted'])

function buttonClick(id) {
  deleteAirplane(id).then(() => emit('airplaneDeleted'))
}
</script>

<template>
  <v-btn icon="mdi-bucket"
         size="x-small"
         variant="plain"
         @click="buttonClick(airplane.id)"
  >
  </v-btn>
</template>