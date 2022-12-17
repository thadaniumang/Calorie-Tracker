import axios from 'axios';

const baseURL = 'https://api.edamam.com/api/food-database/v2/';
const appId = process.env.NEXT_PUBLIC_EDAMAM_APP_ID;
const appKey = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'app_id': appId,
        'app_key': appKey,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

function nutrientsHandler(json) { 
    axiosInstance.get('nutrients', json).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    });
}

function parser(json) { 
    axiosInstance.get('parser', json).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    });
}

export { nutrientsHandler, parser };
