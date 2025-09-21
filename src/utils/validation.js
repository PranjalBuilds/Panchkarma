// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateTherapyForm = (formData) => {
  const errors = {};
  
  if (!formData.type) {
    errors.type = 'Therapy type is required';
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
  
  if (!formData.notes || formData.notes.trim().length < 10) {
    errors.notes = 'Notes must be at least 10 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
