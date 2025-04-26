import axios from "axios";




export const apiBaseurl =  'https://hu-iapams-api.vercel.app/api/v1'; // process.env.NEXT_PUBLIC_API_BASEURL || 'https://hu-iapams-api.vercel.app/api/v1';


export const api = axios.create({
    baseURL: `${apiBaseurl}`,
  });

  export const publicApi = axios.create({
    baseURL: `${apiBaseurl}`,
  });
