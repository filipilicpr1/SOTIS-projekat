import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";

export const GetPdfById = async (id) => {
  return await axiosClient.get(`${API}/pdf/${id}`);
};