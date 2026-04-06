import axios from 'axios';
import { ConsultationRequest } from '../types';

const API_BASE_URL = 'https://api.eduhorizon.com/v1'; // Replace with your actual API endpoint

export const consultationApi = {
  async bookConsultation(data: ConsultationRequest) {
    try {
      const response = await axios.post(`${API_BASE_URL}/consultations`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to book consultation');
    }
  },

  async getAvailableSlots(date: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/consultations/slots`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch available slots');
    }
  }
};