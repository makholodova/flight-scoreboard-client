import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7294'
  // Set other default configurations here
})

export default axiosInstance