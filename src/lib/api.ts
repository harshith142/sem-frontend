import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const generateSEMPlan = async (payload: any) => {
  const { data } = await axios.post(`${API_URL}/generate_sem_plan/`, payload);
  return data;
};