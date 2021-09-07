import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    email: process.env.REACT_APP_API_HOST,
    password: process.env.REACT_APP_API_HOST,
});
