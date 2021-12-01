import axios from "axios";

const URI = "http://localhost:8081/oauth/token";

const login = (username, password) => {
  const params = new URLSearchParams();
  params.set("grant_type", "password");
  params.set("username", username);
  params.set("password", password);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa("webapp:123"),
    },
  };
  return axios.post(URI, params, config);
};

const refreshToken = ()=>{
  const refreshToken = JSON.parse(localStorage.getItem("user")).refreshToken;
  const params = new URLSearchParams();
  params.set("grant_type", "refresh_token");
  params.set("refresh_token", refreshToken);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa("webapp:123"),
    },
  };
  return axios.post(URI, params, config);
}

const loginService = {
  login,
  refreshToken,
};
export default loginService;
