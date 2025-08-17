import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/personalized", 
    withCredentials: true,
  });


  export const postData = (formData) =>API.post('/post-data',{formData})
  export const getData = (userId) =>API.get(`/get-data/${userId}`)

