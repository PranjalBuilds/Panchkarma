import { storage } from './storage';
import { MOCK_CLINICS, MOCK_DOCTORS } from './constants';

export const initializeMockData = () => {
  // Initialize clinics if not exists
  const existingClinics = storage.getClinics();
  if (existingClinics.length === 0) {
    MOCK_CLINICS.forEach(clinic => {
      storage.addClinic(clinic);
    });
  }

  // Initialize doctors if not exists
  const existingDoctors = storage.getDoctors();
  if (existingDoctors.length === 0) {
    MOCK_DOCTORS.forEach(doctor => {
      storage.addDoctor(doctor);
    });
  }

  // Initialize some default therapy types if not exists
  const existingTherapyTypes = storage.getTherapyTypes();
  if (existingTherapyTypes.length === 0) {
    const defaultTherapies = [
      {
        name: 'Vamana Therapy',
        description: 'Therapeutic vomiting to eliminate Kapha dosha and toxins from the upper body',
        basePrice: '2500',
        duration: '90',
        instructions: 'Avoid heavy meals 24 hours before therapy. Drink plenty of warm water. Follow prescribed diet.'
      },
      {
        name: 'Virechana Therapy',
        description: 'Purgation therapy to cleanse the digestive system and eliminate Pitta dosha',
        basePrice: '2000',
        duration: '60',
        instructions: 'Follow a light diet for 2-3 days before therapy. Avoid oily and spicy foods.'
      },
      {
        name: 'Basti Therapy',
        description: 'Medicated enema therapy to balance Vata dosha and strengthen the colon',
        basePrice: '3000',
        duration: '120',
        instructions: 'Empty bowels before therapy. Follow prescribed diet. Avoid cold foods and drinks.'
      },
      {
        name: 'Nasya Therapy',
        description: 'Nasal administration of medicated oils to treat head and neck disorders',
        basePrice: '1500',
        duration: '45',
        instructions: 'Clean nostrils before therapy. Avoid cold and windy environments.'
      },
      {
        name: 'Raktamokshana Therapy',
        description: 'Bloodletting therapy to purify blood and treat skin disorders',
        basePrice: '4000',
        duration: '90',
        instructions: 'Avoid heavy physical activities. Inform about any blood-related conditions.'
      }
    ];

    defaultTherapies.forEach(therapy => {
      storage.addTherapyType(therapy);
    });
  }
};
