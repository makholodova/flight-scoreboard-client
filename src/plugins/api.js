import axios from '../plugins/axios.js'

//city
export const getCity = (cityId) => axios.get(`/city/${cityId}`)
export const getCities = () => axios.get(`/city`)
export const createCity = (newCity) => axios.post('/city', newCity)
export const updateCity = (newCity) => axios.put('/city', newCity)
export const deleteCity = (cityId) => axios.delete(`/city/${cityId}`)
//airline
export const getAirline = (airlineId) => axios.get(`/airline/${airlineId}`)
export const getAirlines = () => axios.get('/airline')
export const createAirline = (newAirline) => axios.post('/airline', newAirline)
export const updateAirline = (newAirline) => axios.put('/airline', newAirline)
export const deleteAirline = (airlineId) => axios.delete(`/airline/${airlineId}`)

//pilot
export const getPilot = (pilotId) => axios.get(`/pilot/${pilotId}`)
export const getPilots = () => axios.get('/pilot')
export const createPilot = (newPilot) => axios.post('/pilot', newPilot)
export const updatePilot = (newPilot) => axios.put('/pilot', newPilot)
export const deletePilot = (pilotId) => axios.delete(`/pilot/${pilotId}`)

//airplane
export const getAirplane = (airplaneId) => axios.get(`/airplane/${airplaneId}`)
export const getAirplanes = () => axios.get('/airplane')
export const createAirplane = (newAirplane) => axios.post('/airplane', newAirplane)
export const updateAirplane = (newAirplane) => axios.put('/airplane', newAirplane)
export const deleteAirplane = (airplaneId) => axios.delete(`/airplane/${airplaneId}`)
