import axios from 'axios';

const API_URL = 'https://testapi.getlokalapp.com/common/jobs';

export const fetchJobs = async (page) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data.data;
};
