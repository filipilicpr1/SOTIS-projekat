import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";

export const GetAnswer = async (data) => {
  return await axiosClient.get(`${API}/chat/course/${data.id}?question=${data.question}`);
};
