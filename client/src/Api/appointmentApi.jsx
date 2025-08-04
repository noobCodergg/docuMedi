import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/appointment", 
    withCredentials: true,
  });


  export const creatAppointment = (data) => API.post('/create-appointment',data)