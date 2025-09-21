import React from 'react';
import { 
  Sparkles, 
  Mic, 
  MessageCircle, 
  BarChart3, 
  Smartphone,
  Heart,
  Brain,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

const ComingSoon = () => {
  const features = [
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Get guided instructions for your therapies through our intelligent voice assistant. Perfect for hands-free guidance during treatments.',
      status: 'In Development',
      color: 'primary'
    },
    {
      icon: MessageCircle,
      title: 'AI Chatbot',
      description: 'Ask questions about Ayurveda, get symptom analysis, and receive personalized wellness recommendations from our AI-powered chatbot.',
      status: 'Coming Soon',
      color: 'earth'
    },
    {
      icon: BarChart3,
      title: 'Wellness Analytics',
      description: 'Track your progress with detailed analytics, health trends, and personalized insights based on your therapy sessions.',
      status: 'Planned',
      color: 'warm'
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Access AyurSutra on the go with our native mobile app for iOS and Android devices.',
      status: 'In Development',
      color: 'primary'
    },
    {
      icon: Heart,
      title: 'Health Monitoring',
      description: 'Integrate with wearable devices to monitor vital signs and correlate them with your therapy progress.',
      status: 'Planned',
      color: 'earth'
    },
    {
      icon: Brain,
      title: 'AI Diagnosis',
      description: 'Advanced AI-powered preliminary diagnosis based on symptoms and Ayurvedic principles.',
      status: 'Research Phase',
      color: 'warm'
    },
    {
      icon: Zap,
      title: 'Smart Reminders',
      description: 'Intelligent reminders for therapy sessions, medication, and wellness practices based on your schedule.',
      status: 'Coming Soon',
      color: 'primary'
    },
    {
      icon: Shield,
      title: 'Data Security',
      description: 'Enhanced security features with end-to-end encryption for all your health data and communications.',
      status: 'In Development',
      color: 'earth'
    },
    {
      icon: Globe,
      title: 'Global Integration',
      description: 'Connect with Ayurvedic practitioners worldwide and access global wellness resources.',
      status: 'Planned',
      color: 'warm'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Development':
        return 'bg-primary-100 text-primary-700';
      case 'Coming Soon':
        return 'bg-earth-100 text-earth-700';
      case 'Planned':
        return 'bg-warm-100 text-warm-700';
      case 'Research Phase':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary-600 bg-primary-100';
      case 'earth':
        return 'text-earth-600 bg-earth-100';
      case 'warm':
        return 'text-warm-600 bg-warm-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-earth-600 rounded-2xl mb-6">
          <Sparkles className="text-white" size={32} />
        </div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're working on exciting new features to enhance your Ayurvedic wellness journey. 
          Stay tuned for these innovative additions to AyurSutra.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(feature.color)}`}>
                <feature.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                    {feature.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-primary-600 to-earth-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">
          Stay Updated
        </h2>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          Be the first to know when these features are released. 
          Get exclusive early access and special offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">
            Notify Me
          </button>
        </div>
      </div>

      {/* Current Features Reminder */}
      <div className="card bg-earth-50 border-earth-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What's Available Now
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">✓</span>
            </div>
            <span className="text-gray-700">Therapy Scheduling & Management</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">✓</span>
            </div>
            <span className="text-gray-700">Profile Management</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">✓</span>
            </div>
            <span className="text-gray-700">Secure Authentication</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">✓</span>
            </div>
            <span className="text-gray-700">Real-time Notifications</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
