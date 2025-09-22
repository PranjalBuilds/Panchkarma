import emailjs from '@emailjs/browser';

// EmailJS configuration (replace with your actual service ID, template ID, and public key)
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const emailService = {
  // Send booking confirmation
  sendBookingConfirmation: async (userEmail, userName, therapyDetails) => {
    try {
      const templateParams = {
        to_email: userEmail,
        to_name: userName,
        therapy_type: therapyDetails.type,
        therapy_date: therapyDetails.date,
        therapy_time: therapyDetails.time,
        therapy_duration: therapyDetails.duration,
        practitioner: therapyDetails.practitioner || 'Dr. Ayurveda Specialist',
        message: `Dear ${userName}, your ${therapyDetails.type} therapy has been confirmed for ${therapyDetails.date} at ${therapyDetails.time}.`
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        'booking_confirmation',
        templateParams
      );
      
      console.log('Booking confirmation sent:', response);
      return { success: true, response };
    } catch (error) {
      console.error('Error sending booking confirmation:', error);
      return { success: false, error };
    }
  },

  // Send therapy reminder
  sendTherapyReminder: async (userEmail, userName, therapyDetails) => {
    try {
      const templateParams = {
        to_email: userEmail,
        to_name: userName,
        therapy_type: therapyDetails.type,
        therapy_date: therapyDetails.date,
        therapy_time: therapyDetails.time,
        message: `Reminder: Your ${therapyDetails.type} therapy is scheduled for tomorrow at ${therapyDetails.time}. Please arrive 15 minutes early.`
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        'therapy_reminder',
        templateParams
      );
      
      console.log('Therapy reminder sent:', response);
      return { success: true, response };
    } catch (error) {
      console.error('Error sending therapy reminder:', error);
      return { success: false, error };
    }
  },

  // Send pre-therapy instructions
  sendPreTherapyInstructions: async (userEmail, userName, therapyDetails) => {
    try {
      const instructions = getPreTherapyInstructions(therapyDetails.type);
      
      const templateParams = {
        to_email: userEmail,
        to_name: userName,
        therapy_type: therapyDetails.type,
        therapy_date: therapyDetails.date,
        therapy_time: therapyDetails.time,
        instructions: instructions,
        message: `Pre-therapy instructions for your ${therapyDetails.type} session tomorrow.`
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        'pre_therapy_instructions',
        templateParams
      );
      
      console.log('Pre-therapy instructions sent:', response);
      return { success: true, response };
    } catch (error) {
      console.error('Error sending pre-therapy instructions:', error);
      return { success: false, error };
    }
  },

  // Send post-therapy instructions
  sendPostTherapyInstructions: async (userEmail, userName, therapyDetails) => {
    try {
      const instructions = getPostTherapyInstructions(therapyDetails.type);
      
      const templateParams = {
        to_email: userEmail,
        to_name: userName,
        therapy_type: therapyDetails.type,
        instructions: instructions,
        message: `Post-therapy care instructions for your ${therapyDetails.type} session.`
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        'post_therapy_instructions',
        templateParams
      );
      
      console.log('Post-therapy instructions sent:', response);
      return { success: true, response };
    } catch (error) {
      console.error('Error sending post-therapy instructions:', error);
      return { success: false, error };
    }
  },

  // Send cancellation notification
  sendCancellationNotification: async (userEmail, userName, therapyDetails) => {
    try {
      const templateParams = {
        to_email: userEmail,
        to_name: userName,
        therapy_type: therapyDetails.type,
        therapy_date: therapyDetails.date,
        therapy_time: therapyDetails.time,
        message: `Your ${therapyDetails.type} therapy scheduled for ${therapyDetails.date} at ${therapyDetails.time} has been cancelled.`
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        'therapy_cancellation',
        templateParams
      );
      
      console.log('Cancellation notification sent:', response);
      return { success: true, response };
    } catch (error) {
      console.error('Error sending cancellation notification:', error);
      return { success: false, error };
    }
  }
};

// Helper functions for therapy-specific instructions
const getPreTherapyInstructions = (therapyType) => {
  const instructions = {
    vamana: [
      'Avoid heavy meals 24 hours before therapy',
      'Drink plenty of warm water',
      'Follow prescribed diet (light, easily digestible food)',
      'Avoid cold drinks and ice cream',
      'Get adequate rest the night before'
    ],
    virechana: [
      'Follow a light diet for 2-3 days before therapy',
      'Avoid oily and spicy foods',
      'Drink warm water throughout the day',
      'Avoid alcohol and smoking',
      'Take prescribed medications as directed'
    ],
    basti: [
      'Empty your bowels before the therapy',
      'Follow a light diet',
      'Avoid cold foods and drinks',
      'Stay hydrated with warm water',
      'Inform practitioner of any discomfort'
    ],
    nasya: [
      'Clean your nostrils before therapy',
      'Avoid cold and windy environments',
      'Follow prescribed diet',
      'Avoid smoking and alcohol',
      'Get adequate rest'
    ],
    raktamokshana: [
      'Avoid heavy physical activities',
      'Follow prescribed diet',
      'Inform about any blood-related conditions',
      'Avoid alcohol and smoking',
      'Get adequate rest'
    ]
  };
  
  return instructions[therapyType] || instructions.vamana;
};

const getPostTherapyInstructions = (therapyType) => {
  const instructions = {
    vamana: [
      'Follow a light, warm diet for 3-5 days',
      'Avoid cold foods and drinks',
      'Rest adequately',
      'Take prescribed medications',
      'Avoid physical exertion'
    ],
    virechana: [
      'Follow prescribed post-therapy diet',
      'Stay hydrated with warm water',
      'Avoid oily and spicy foods',
      'Rest and avoid physical strain',
      'Take prescribed medications'
    ],
    basti: [
      'Rest for 30-60 minutes after therapy',
      'Follow prescribed diet',
      'Avoid cold foods and drinks',
      'Take prescribed medications',
      'Avoid heavy physical activities'
    ],
    nasya: [
      'Avoid cold and windy environments',
      'Follow prescribed diet',
      'Avoid smoking and alcohol',
      'Rest adequately',
      'Take prescribed medications'
    ],
    raktamokshana: [
      'Keep the treated area clean and dry',
      'Follow prescribed diet',
      'Avoid heavy physical activities',
      'Take prescribed medications',
      'Monitor for any unusual symptoms'
    ]
  };
  
  return instructions[therapyType] || instructions.vamana;
};
