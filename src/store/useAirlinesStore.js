import { defineStore } from 'pinia'
import { getAirlines } from '@/plugins/api.js'

export const useAirlinesStore = defineStore('airlines', {
  state: () => ({
    airlines: []
  }),
  getters: {
    airlinesForAutocomplete(state) {
      return state.airlines.map(x => ({ value: x.id, title: x.name }))
    }
  },
  actions: {
    load() {
      if (this.airlines.length === 0) {
        getAirlines().then(res => this.airlines = res.data)
      }
    },
    clear() {
      this.airlines = []
    }
  }
})