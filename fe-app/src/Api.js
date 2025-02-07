import axios from "axios";

const Api = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: {
      ...(userData?.jwt && { Authorization: userData.jwt }),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    },
  });
};

export default Api;
