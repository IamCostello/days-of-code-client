import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:9000",
});

axiosClient.interceptors.request.use((req) => {
  console.log("[REQUEST]", req);
  return req;
});

axiosClient.interceptors.response.use((res) => {
  console.log("[RESPONSE]", res);
  return res;
});

let authTokenInterceptor: number;

export const addAuthTokenInterceptor = (token: string) => {
  authTokenInterceptor = axiosClient.interceptors.request.use((req) => {
    req.headers.authtoken = token;
    return req;
  });
};

export const ejectAuthTokenInterceptor = () => {
  axiosClient.interceptors.request.eject(authTokenInterceptor);
};

export default axiosClient;
