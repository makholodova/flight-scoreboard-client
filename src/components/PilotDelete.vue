<script setup>
import { deletePilot } from '@/plugins/api.js'

defineProps(['pilot'])
const emit = defineEmits(['pilotDeleted'])

function buttonClick(id) {
  deletePilot(id).then(() => emit('pilotDeleted'))
}
</script>

<template>
  <v-btn icon="mdi-bucket"
         size="x-small"
         variant="plain"
         @click="buttonClick(pilot.id)"
  >
  </v-btn>
</template>
