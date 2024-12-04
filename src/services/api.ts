import axios from "axios";

const API_URL = "https://674f1a0bbb559617b26e0ae7.mockapi.io/budgetTracker";

// Function to get data
export const getData = async (endPoint: string) => {
  try {
    const response = await axios.get(`${API_URL}/${endPoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// Function to post data
export const postData = async (endPoint: string, data: object) => {
  try {
    const response = await axios.post(`${API_URL}/${endPoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting transaction:", error);
    throw error; // Re-throw to handle errors in the calling component
  }
};
