import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/",
  responseType: "json",
});

export const baseApi = {
  ...axiosInstance,
};
