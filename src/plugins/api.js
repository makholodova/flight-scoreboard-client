import axios from '../plugins/axios.js'

//city

//airline
export const getAirlines = () => axios.get('/airline')

//pilot
export const getPilot = (pilotId) => axios.get(`/pilot/${pilotId}`)
export const getPilots = () => axios.get('/pilot')
export const createPilot = (newPilot) => axios.post('/pilot', newPilot)
export const updatePilot = (newPilot) => axios.put('/pilot', newPilot)
export const deletePilot = (pilotId) => axios.delete(`/pilot/${pilotId}`)
