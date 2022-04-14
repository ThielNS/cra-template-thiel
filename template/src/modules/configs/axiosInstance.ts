import axios from 'axios';

export const SERVICE_BASE_URL = 'https://elos.azurewebsites.net/';

const axiosInstance = axios.create({ baseURL: SERVICE_BASE_URL });

export default axiosInstance;
