import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const countriesApi = {
    async getCountries() {
      try {
        console.log('Attempting to fetch countries from:', `${API_BASE_URL}/countries`);
        const response = await axios.get(`${API_BASE_URL}/countries`);
        console.log('Raw response:', response);
  
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
          throw new Error('Received HTML instead of JSON. Check the API endpoint.');
        }
  
        if (!Array.isArray(response.data)) {
          throw new Error('Unexpected response format. Expected an array.');
        }
  
        return response.data;
      } catch (error) {
        console.error('Error in getCountries:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
        throw error;
      }
    }
  };