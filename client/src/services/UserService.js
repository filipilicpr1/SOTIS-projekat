import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";

export const Login = async (userLogin) => {
  return await axiosClient.post(`${API}/users/login`, userLogin);
};

export const GetUserById = async (id) => {
  return await axiosClient.get(`${API}/users/${id}`);
};

export const Register = async (data) => {
  return await axiosClient.post(`${API}/users`, data);
};
