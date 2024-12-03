import axios from 'axios';

const API_URL = 'https://674f1a0bbb559617b26e0ae7.mockapi.io/budgetTracker';
export const getData = async (endPoint: string) => {
  try {
    const response = await axios.get(`${API_URL}/${endPoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};
