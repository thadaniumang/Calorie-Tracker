import axios from 'axios';

const baseURL = 'https://api.edamam.com/api/food-database/v2/';
const appId = process.env.NEXT_PUBLIC_EDAMAM_APP_ID;
const appKey = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export { axiosInstance, appId, appKey };
