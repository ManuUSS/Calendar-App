import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseUrl: VITE_API_URL
});

calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config,
        'x-token': localStorage.getItem('token') | ''
    }

    return config;
});

export default calendarApi;

