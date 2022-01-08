import axios from "axios";


const httpClient = axios.create({

  baseURL: "https://api.github.com",
  
  headers: {
    Accept: "application/vnd.github.v3+json",
    "X-Requested-With": "XMLHttpRequest",
  },

});




export default httpClient;