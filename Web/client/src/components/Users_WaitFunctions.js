import axios from 'axios';

axios.defaults.timeout = 200000;
axios.interceptors.response.use((response) => response, (error) => {
    // whatever you want to do with the error
    console.log("[API]" + error);
    throw error;
});


const instance_axios = axios.create({ baseURL: 'http://localhost:5000/' })

export const register = user => {
    return instance_axios.post(
        '/pendingUsers', user )
        .then(res => {
            return res.data
         }).catch(err => err)
}

