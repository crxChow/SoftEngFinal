import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://qsnf3fzubl.execute-api.us-east-1.amazonaws.com/Prod/'
  });
