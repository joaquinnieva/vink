import Axios from 'axios';

const URI_API = `https://vink-api.herokuapp.com/api`;

export const loginUser = async (value) => {
  try {
    const res = await Axios.post(`${URI_API}/login`, value);
    const api = res.data;
    return api;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (value) => {
  try {
    const res = await Axios.post(`${URI_API}/user`, value);
    const api = res.data;
    return api;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (param) => {
  try {
    const res = await Axios.get(`${URI_API}/user/${param}`);
    const api = res.data;
    return api;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (id, value, token) => {
  try {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
      },
    };
    const res = await Axios.put(`${URI_API}/user/${id}`, value, config);
    const api = res.data;
    return api;
  } catch (error) {
    console.log(error);
  }
};
