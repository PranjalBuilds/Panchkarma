// Validation utilities
const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 
  'rediffmail.com', 'protonmail.com', 'icloud.com', 'aol.com'
];

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  const domain = email.split('@')[1].toLowerCase();
  return ALLOWED_EMAIL_DOMAINS.includes(domain);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateIndianPhone = (phone) => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  // Check if it's exactly 10 digits and starts with 6-9
  return /^[6-9]\d{9}$/.test(cleanPhone);
};

export const validatePhone = (phone) => {
  return validateIndianPhone(phone);
};

export const validateTherapyForm = (formData) => {
  const errors = {};
  
  if (!formData.therapyTypeId) {
    errors.therapyTypeId = 'Therapy type is required';
  }
  
  if (!formData.clinicId) {
    errors.clinicId = 'Clinic is required';
  }
  
  if (!formData.date) {
    errors.date = 'Date is required';
  } else {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.date = 'Date cannot be in the past';
    }
  }
  
  if (!formData.time) {
    errors.time = 'Time is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
