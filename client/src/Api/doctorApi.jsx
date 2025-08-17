import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/doctors", 
    withCredentials: true,
  });


  export const postDoctor = (formData) =>API.post('/post-doctor',{formData})
  export const getDoctor = () => API.get('/get-doctor')
  