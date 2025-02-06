import axios from "axios";

const Api = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: {
      ...(userData?.jwt && { Authorization: userData.jwt }),
    },
  });
};

export default Api;
