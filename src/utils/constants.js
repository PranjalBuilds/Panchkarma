// Constants for the application
export const THERAPY_TYPES = [
  { value: 'vamana', label: 'Vamana (Therapeutic Vomiting)' },
  { value: 'virechana', label: 'Virechana (Purgation Therapy)' },
  { value: 'basti', label: 'Basti (Medicated Enema)' },
  { value: 'nasya', label: 'Nasya (Nasal Administration)' },
  { value: 'raktamokshana', label: 'Raktamokshana (Bloodletting)' }
];

export const TIME_SLOTS = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00'
];

export const APP_CONFIG = {
  name: 'AyurSutra',
  tagline: 'Panchakarma Management System',
  version: '1.0.0'
};

// Mock data for initial setup
export const MOCK_CLINICS = [
  {
    id: 'clinic-1',
    name: 'AyurSutra Wellness Center',
    location: 'Mumbai, Maharashtra',
    address: '123 Wellness Street, Bandra West, Mumbai - 400050',
    phone: '+91 98765 43210',
    email: 'mumbai@ayursutra.com',
    timings: '6:00 AM - 8:00 PM',
    facilities: ['Parking', 'WiFi', 'Waiting Area', 'Consultation Rooms']
  },
  {
    id: 'clinic-2',
    name: 'AyurSutra Healing Hub',
    location: 'Delhi, NCR',
    address: '456 Healing Avenue, Connaught Place, New Delhi - 110001',
    phone: '+91 98765 43211',
    email: 'delhi@ayursutra.com',
    timings: '6:00 AM - 8:00 PM',
    facilities: ['Parking', 'WiFi', 'Waiting Area', 'Consultation Rooms', 'Cafeteria']
  },
  {
    id: 'clinic-3',
    name: 'AyurSutra Health Center',
    location: 'Bangalore, Karnataka',
    address: '789 Health Lane, Koramangala, Bangalore - 560034',
    phone: '+91 98765 43212',
    email: 'bangalore@ayursutra.com',
    timings: '6:00 AM - 8:00 PM',
    facilities: ['Parking', 'WiFi', 'Waiting Area', 'Consultation Rooms', 'Garden']
  }
];

export const MOCK_DOCTORS = [
  {
    id: 'doctor-1',
    name: 'Dr. Rajesh Sharma',
    specialization: 'Panchakarma Specialist',
    experience: '15 years',
    qualifications: 'BAMS, MD (Ayurveda)',
    phone: '+91 98765 43220',
    email: 'rajesh@ayursutra.com',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timings: '9:00 AM - 6:00 PM'
  },
  {
    id: 'doctor-2',
    name: 'Dr. Priya Patel',
    specialization: 'Vamana & Virechana Expert',
    experience: '12 years',
    qualifications: 'BAMS, MS (Ayurveda)',
    phone: '+91 98765 43221',
    email: 'priya@ayursutra.com',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    timings: '8:00 AM - 5:00 PM'
  },
  {
    id: 'doctor-3',
    name: 'Dr. Amit Kumar',
    specialization: 'Basti & Nasya Specialist',
    experience: '18 years',
    qualifications: 'BAMS, MD (Ayurveda), PhD',
    phone: '+91 98765 43222',
    email: 'amit@ayursutra.com',
    availableDays: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
    timings: '10:00 AM - 7:00 PM'
  }
];
