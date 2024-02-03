import axios from 'axios';

const BASE_URL = 'http://localhost:6100/api/users';

export const getUserInfo = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/info`, {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};