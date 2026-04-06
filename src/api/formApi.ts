import axios from 'axios';
import { FormData, ApiResponse } from '../types/form';

const API_BASE_URL = 'AIzaSyBgkr1UjkejLKiNqo1C_yHIDVjNHnduUd4'; // Replace with your actual API endpoint

export const formApi = {
  async submitPopupForm(data: FormData): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/popup-inquiry`, data);
      return {
        success: true,
        message: 'Form submitted successfully',
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to submit form. Please try again.'
      };
    }
  },

  async submitContactForm(data: FormData): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, data);
      return {
        success: true,
        message: 'Message sent successfully',
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send message. Please try again.'
      };
    }
  }
};