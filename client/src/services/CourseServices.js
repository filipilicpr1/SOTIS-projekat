import { axiosClient } from "./axiosClient";
import { API } from "../constants/Constants";

export const CreateNewCourse = async (data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return await axiosClient.post(`${API}/course`, data, config);
};

export const GetAllCourses = async (query) => {
  return await axiosClient.get(`${API}/course${query}`);
};

export const AddPdfToCourse = async (id, data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return await axiosClient.put(`${API}/course/${id}`, data, config);
};
