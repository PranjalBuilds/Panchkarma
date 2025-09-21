# AyurSutra - Panchakarma Management MVP

A modern, minimalist React application for managing Ayurvedic Panchakarma therapy sessions with a beautiful, earthy design theme.

## 🌿 Features

### ✅ Implemented
- **Authentication System** - Signup, login, logout with localStorage persistence
- **Profile Management** - View and edit user profile information
- **Therapy Scheduling** - Schedule, edit, and manage Panchakarma therapy sessions
- **Real-time Notifications** - Toast notifications for all user actions
- **Responsive Design** - Beautiful UI that works on all devices
- **Ayurveda Theme** - Earthy colors and professional design

### 🚀 Coming Soon
- Voice Assistant for therapy instructions
- AI Chatbot for FAQs and symptom tracking
- Wellness Analytics and progress tracking
- Mobile app for iOS and Android
- Health monitoring integration
- AI-powered diagnosis
- Smart reminders
- Enhanced data security
- Global practitioner network

## 🛠 Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom Ayurveda theme
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **Storage**: LocalStorage (ready for future database integration)
- **Email**: EmailJS (optional integration)

## 🎨 Design System

### Colors
- **Primary**: Earthy greens (#3a9d3a, #2d7d2d)
- **Earth**: Warm beiges and browns (#b19d7f, #857157)
- **Warm**: Soft golds and creams (#e8c896, #c49a5a)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

1. **Sign Up** - Create a new account with your details
2. **Sign In** - Access your personalized dashboard
3. **Schedule Therapies** - Book Panchakarma sessions
4. **Manage Profile** - Update your personal information
5. **Track Progress** - View your therapy history and upcoming sessions

## 🧘‍♀️ Therapy Types

- **Vamana** - Therapeutic Vomiting
- **Virechana** - Purgation Therapy
- **Basti** - Medicated Enema
- **Nasya** - Nasal Administration
- **Raktamokshana** - Bloodletting

## 🔧 Development

### Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Main application pages
├── context/       # React context providers
├── utils/         # Utility functions and constants
├── hooks/         # Custom React hooks
└── assets/        # Static assets
```

### Key Files
- `src/App.jsx` - Main application component with routing
- `src/context/AuthContext.jsx` - Authentication state management
- `src/utils/storage.js` - LocalStorage utility functions
- `src/pages/Dashboard.jsx` - Main dashboard page
- `src/pages/Therapies.jsx` - Therapy scheduling page

## 🔮 Future Enhancements

This MVP is designed to be easily extensible. The localStorage implementation can be seamlessly replaced with:
- SQL databases (PostgreSQL, MySQL)
- NoSQL databases (MongoDB, Firebase)
- REST APIs
- GraphQL endpoints

## 📄 License

This project is part of the AyurSutra wellness platform.

---

**AyurSutra** - Nurturing wellness through ancient wisdom and modern technology 🌿
