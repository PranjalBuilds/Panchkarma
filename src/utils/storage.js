// LocalStorage utility functions
export const storage = {
  // User authentication
  setUser: (user) => {
    localStorage.setItem('ayursutra_user', JSON.stringify(user));
  },
  
  getUser: () => {
    const user = localStorage.getItem('ayursutra_user');
    return user ? JSON.parse(user) : null;
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
  
  // Clear all data
  clearAll: () => {
    localStorage.removeItem('ayursutra_user');
    localStorage.removeItem('ayursutra_session');
    localStorage.removeItem('ayursutra_therapies');
  }
};
