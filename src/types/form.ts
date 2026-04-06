export interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}