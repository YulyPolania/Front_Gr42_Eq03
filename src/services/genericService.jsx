import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://localhost:8081";

const genericService = () => {
  let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  let axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    const info = jwt_decode(user?.accessToken);
    const isExpired = dayjs.unix(info?.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const params = new URLSearchParams();
    params.set("grant_type", "refresh_token");
    params.set("refresh_token", user?.refreshToken);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa("webapp:123"),
      },
    };

    const response = await axios.post(`${baseURL}/oauth/token`, params, config);

    user.accessToken = response.data.access_token;
    user.refreshToken = response.data.refresh_token;

    localStorage.setItem("user", JSON.stringify(user));
    req.headers.Authorization = `Bearer ${response.data.access_token}`;
    return req;
  });
  return axiosInstance;
};

export default genericService;
