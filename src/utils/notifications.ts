import { supabase } from './supabase';

interface NotificationData {
  name: string;
  email: string;
  phone: string;
  date?: string;
  time?: string;
}

export const sendNotifications = async (data: NotificationData) => {
  try {
    // Store notification in Supabase
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert([{
        recipient_name: data.name,
        recipient_email: data.email,
        recipient_phone: data.phone,
        appointment_date: data.date,
        appointment_time: data.time,
        type: 'consultation_booking',
        status: 'pending'
      }]);

    if (notificationError) {
      console.error('Notification error:', notificationError);
      return {
        success: false,
        message: 'Failed to queue notification'
      };
    }

    return {
      success: true,
      message: 'Notification queued successfully'
    };
  } catch (error) {
    console.error('Failed to send notifications:', error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};