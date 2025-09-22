// LocalStorage utility functions
export const storage = {
  // User authentication - keep users persistent
  setUser: (user) => {
    localStorage.setItem('ayursutra_user', JSON.stringify(user));
  },
  
  getUser: () => {
    const user = localStorage.getItem('ayursutra_user');
    return user ? JSON.parse(user) : null;
  },
  
  // Get all users (for admin)
  getAllUsers: () => {
    const users = localStorage.getItem('ayursutra_all_users');
    return users ? JSON.parse(users) : [];
  },
  
  setAllUsers: (users) => {
    localStorage.setItem('ayursutra_all_users', JSON.stringify(users));
  },
  
  addUser: (user) => {
    const allUsers = storage.getAllUsers();
    allUsers.push(user);
    storage.setAllUsers(allUsers);
  },
  
  updateUser: (userId, updates) => {
    const allUsers = storage.getAllUsers();
    const userIndex = allUsers.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      allUsers[userIndex] = { ...allUsers[userIndex], ...updates };
      storage.setAllUsers(allUsers);
    }
  },
  
  removeUser: () => {
    localStorage.removeItem('ayursutra_user');
  },
  
  // Session management
  setSession: (session) => {
    localStorage.setItem('ayursutra_session', JSON.stringify(session));
  },
  
  getSession: () => {
    const session = localStorage.getItem('ayursutra_session');
    return session ? JSON.parse(session) : null;
  },
  
  removeSession: () => {
    localStorage.removeItem('ayursutra_session');
  },
  
  // Therapy data
  setTherapies: (therapies) => {
    localStorage.setItem('ayursutra_therapies', JSON.stringify(therapies));
  },
  
  getTherapies: () => {
    const therapies = localStorage.getItem('ayursutra_therapies');
    return therapies ? JSON.parse(therapies) : [];
  },
  
  addTherapy: (therapy) => {
    const therapies = storage.getTherapies();
    const newTherapy = {
      id: Date.now().toString(),
      ...therapy,
      createdAt: new Date().toISOString()
    };
    therapies.push(newTherapy);
    storage.setTherapies(therapies);
    return newTherapy;
  },
  
  updateTherapy: (id, updates) => {
    const therapies = storage.getTherapies();
    const index = therapies.findIndex(t => t.id === id);
    if (index !== -1) {
      therapies[index] = { ...therapies[index], ...updates };
      storage.setTherapies(therapies);
      return therapies[index];
    }
    return null;
  },
  
  deleteTherapy: (id) => {
    const therapies = storage.getTherapies();
    const filtered = therapies.filter(t => t.id !== id);
    storage.setTherapies(filtered);
    return true;
  },
  
  // Therapies (admin managed)
  setTherapyTypes: (therapyTypes) => {
    localStorage.setItem('ayursutra_therapy_types', JSON.stringify(therapyTypes));
  },
  
  getTherapyTypes: () => {
    const therapyTypes = localStorage.getItem('ayursutra_therapy_types');
    return therapyTypes ? JSON.parse(therapyTypes) : [];
  },
  
  addTherapyType: (therapyType) => {
    const therapyTypes = storage.getTherapyTypes();
    const newTherapyType = {
      id: Date.now().toString(),
      ...therapyType,
      createdAt: new Date().toISOString()
    };
    therapyTypes.push(newTherapyType);
    storage.setTherapyTypes(therapyTypes);
    return newTherapyType;
  },
  
  updateTherapyType: (id, updates) => {
    const therapyTypes = storage.getTherapyTypes();
    const index = therapyTypes.findIndex(t => t.id === id);
    if (index !== -1) {
      therapyTypes[index] = { ...therapyTypes[index], ...updates };
      storage.setTherapyTypes(therapyTypes);
      return therapyTypes[index];
    }
    return null;
  },
  
  deleteTherapyType: (id) => {
    const therapyTypes = storage.getTherapyTypes();
    const filtered = therapyTypes.filter(t => t.id !== id);
    storage.setTherapyTypes(filtered);
    return true;
  },
  
  // Doctors (admin managed)
  setDoctors: (doctors) => {
    localStorage.setItem('ayursutra_doctors', JSON.stringify(doctors));
  },
  
  getDoctors: () => {
    const doctors = localStorage.getItem('ayursutra_doctors');
    return doctors ? JSON.parse(doctors) : [];
  },
  
  addDoctor: (doctor) => {
    const doctors = storage.getDoctors();
    const newDoctor = {
      id: Date.now().toString(),
      ...doctor,
      createdAt: new Date().toISOString()
    };
    doctors.push(newDoctor);
    storage.setDoctors(doctors);
    return newDoctor;
  },
  
  updateDoctor: (id, updates) => {
    const doctors = storage.getDoctors();
    const index = doctors.findIndex(d => d.id === id);
    if (index !== -1) {
      doctors[index] = { ...doctors[index], ...updates };
      storage.setDoctors(doctors);
      return doctors[index];
    }
    return null;
  },
  
  deleteDoctor: (id) => {
    const doctors = storage.getDoctors();
    const filtered = doctors.filter(d => d.id !== id);
    storage.setDoctors(filtered);
    return true;
  },
  
  // Clinics (admin managed)
  setClinics: (clinics) => {
    localStorage.setItem('ayursutra_clinics', JSON.stringify(clinics));
  },
  
  getClinics: () => {
    const clinics = localStorage.getItem('ayursutra_clinics');
    return clinics ? JSON.parse(clinics) : [];
  },
  
  addClinic: (clinic) => {
    const clinics = storage.getClinics();
    const newClinic = {
      id: Date.now().toString(),
      ...clinic,
      createdAt: new Date().toISOString()
    };
    clinics.push(newClinic);
    storage.setClinics(clinics);
    return newClinic;
  },
  
  // Slots (admin managed)
  setSlots: (slots) => {
    localStorage.setItem('ayursutra_slots', JSON.stringify(slots));
  },
  
  getSlots: () => {
    const slots = localStorage.getItem('ayursutra_slots');
    return slots ? JSON.parse(slots) : [];
  },
  
  addSlot: (slot) => {
    const slots = storage.getSlots();
    const newSlot = {
      id: Date.now().toString(),
      ...slot,
      createdAt: new Date().toISOString()
    };
    slots.push(newSlot);
    storage.setSlots(slots);
    return newSlot;
  },
  
  updateSlot: (id, updates) => {
    const slots = storage.getSlots();
    const index = slots.findIndex(s => s.id === id);
    if (index !== -1) {
      slots[index] = { ...slots[index], ...updates };
      storage.setSlots(slots);
      return slots[index];
    }
    return null;
  },
  
  // Feedback (patient to admin)
  setFeedbacks: (feedbacks) => {
    localStorage.setItem('ayursutra_feedbacks', JSON.stringify(feedbacks));
  },
  
  getFeedbacks: () => {
    const feedbacks = localStorage.getItem('ayursutra_feedbacks');
    return feedbacks ? JSON.parse(feedbacks) : [];
  },
  
  addFeedback: (feedback) => {
    const feedbacks = storage.getFeedbacks();
    const newFeedback = {
      id: Date.now().toString(),
      ...feedback,
      createdAt: new Date().toISOString()
    };
    feedbacks.push(newFeedback);
    storage.setFeedbacks(feedbacks);
    return newFeedback;
  },
  
  // Clear all data
  clearAll: () => {
    localStorage.removeItem('ayursutra_user');
    localStorage.removeItem('ayursutra_session');
    localStorage.removeItem('ayursutra_therapies');
    // Don't clear admin data
  }
};
