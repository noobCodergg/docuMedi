import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/files", 
    withCredentials: true,
  });


export const uploadFile = (formData) =>
  API.post("/upload-file", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });


  export const getFiles = (userId) =>API.get(`/get-files/${userId}`)
  export const getSingleFile = (id) => API.get(`/get-single-file/${id}`)