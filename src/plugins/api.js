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

export const getAirlineAirplanes = (airlineId) => axios.get(`/airline/${airlineId}/airplanes`)
export const getAirlineAirplane = (airlineId, airplaneId) =>
  axios.get(`/airline/${airlineId}/airplane/${airplaneId}`)
export const createAirlineAirplane = (airlineId, newAirplane) =>
  axios.post(`/airline/${airlineId}/airplane`, newAirplane)
export const updateAirlineAirplane = (airlineId, newAirplane) =>
  axios.put(`/airline/${airlineId}/airplane`, newAirplane)
export const deleteAirlineAirplane = (airlineId, airplaneId) =>
  axios.delete(`/airline/${airlineId}/airplane/${airplaneId}`)

//pilot
export const getPilot = (pilotId) => axios.get(`/pilot/${pilotId}`)
export const getPilots = () => axios.get('/pilot')
export const getPilotsByAirlineId = (airlineId) => axios.get(`/pilot?airlineId=${airlineId}`)
export const createPilot = (newPilot) => axios.post('/pilot', newPilot)
export const updatePilot = (newPilot) => axios.put('/pilot', newPilot)
export const deletePilot = (pilotId) => axios.delete(`/pilot/${pilotId}`)

//airplane
export const getAirplane = (airplaneId) => axios.get(`/airplane/${airplaneId}`)
export const getAirplanes = () => axios.get('/airplane')
export const createAirplane = (newAirplane) => axios.post('/airplane', newAirplane)
export const updateAirplane = (newAirplane) => axios.put('/airplane', newAirplane)
export const deleteAirplane = (airplaneId) => axios.delete(`/airplane/${airplaneId}`)

//flight
export const getFlight = (flightId) => axios.get(`/flight/${flightId}`)
export const getFlights = () => axios.get('/flight')
export const createFlight = (newFlight) => axios.post('/flight', newFlight)
export const updateFlight = (newFlight) => axios.put('/flight', newFlight)
export  const deleteFlight =(flightId)=>axios.delete(`/flight/${flightId}`)

//ScoreboardArrival
export const getArrivalFlights = () => axios.get('/scoreboardArrival')

//ScoreboardDeparture
export const getDepartureFlights = () => axios.get('/scoreboardDeparture')