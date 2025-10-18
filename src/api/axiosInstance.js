
import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'http://localhost:8080/api/v1',   

  //  baseURL: 'https://api.greenplore.com/api/v1', 
  withCredentials: true
});

export default axiosInstance;