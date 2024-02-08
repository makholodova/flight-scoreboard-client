<script setup>
import { deleteCity } from '@/plugins/api.js'

defineProps(['city'])
const emit = defineEmits(['cityDeleted'])

function buttonClick(id) {
  deleteCity(id).then(() => emit('cityDeleted'))
}
</script>

<template>
  <v-btn icon="mdi-bucket"
         size="x-small"
         variant="plain"
         @click="buttonClick(city.id)"
  >
  </v-btn>
</template>