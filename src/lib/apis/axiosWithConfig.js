import axios from "axios";

let token = "21102012";
let baseUrl = "https://testcasefe2023.ignorelist.com/api/v1";
const axiosWithConfig = axios.create();

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = baseUrl;
  axiosConfig.headers["NIM"] = token;

  return axiosConfig;
});

export default axiosWithConfig;
