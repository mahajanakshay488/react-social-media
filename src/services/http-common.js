import axios from 'axios';

// const reqOptions = {
//     origin: true,
//     withCredentials: true,
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json;charset=UTF-8"
//     }
// }

const http = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    origin:true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
    },
});

export default http;