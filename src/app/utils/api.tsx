import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

//@ts-ignore
export const fetchData = async (url, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await api.get(url, { headers });
  return response.data.data;
};
