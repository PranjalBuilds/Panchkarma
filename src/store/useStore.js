import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Theme state
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // User state
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      // Therapy slots state
      therapySlots: [],
      setTherapySlots: (slots) => set({ therapySlots: slots }),
      addTherapySlot: (slot) => set((state) => ({
        therapySlots: [...state.therapySlots, slot]
      })),
      updateTherapySlot: (id, updates) => set((state) => ({
        therapySlots: state.therapySlots.map(slot =>
          slot.id === id ? { ...slot, ...updates } : slot
        )
      })),
      deleteTherapySlot: (id) => set((state) => ({
        therapySlots: state.therapySlots.filter(slot => slot.id !== id)
      })),

      // Bookings state
      bookings: [],
      setBookings: (bookings) => set({ bookings }),
      addBooking: (booking) => set((state) => ({
        bookings: [...state.bookings, booking]
      })),
      updateBooking: (id, updates) => set((state) => ({
        bookings: state.bookings.map(booking =>
          booking.id === id ? { ...booking, ...updates } : booking
        )
      })),
      deleteBooking: (id) => set((state) => ({
        bookings: state.bookings.filter(booking => booking.id !== id)
      })),

      // Waitlist state
      waitlist: [],
      setWaitlist: (waitlist) => set({ waitlist }),
      addToWaitlist: (item) => set((state) => ({
        waitlist: [...state.waitlist, item]
      })),
      removeFromWaitlist: (id) => set((state) => ({
        waitlist: state.waitlist.filter(item => item.id !== id)
      })),

      // Feedback state
      feedbacks: [],
      setFeedbacks: (feedbacks) => set({ feedbacks }),
      addFeedback: (feedback) => set((state) => ({
        feedbacks: [...state.feedbacks, feedback]
      })),

      // Payment state
      payments: [],
      setPayments: (payments) => set({ payments }),
      addPayment: (payment) => set((state) => ({
        payments: [...state.payments, payment]
      })),

      // Notifications state
      notifications: [],
      setNotifications: (notifications) => set({ notifications }),
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, notification]
      })),
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      })),

      // Admin state
      adminStats: {
        totalSlots: 0,
        occupiedSlots: 0,
        freeSlots: 0,
        totalBookings: 0,
        totalPatients: 0,
        totalRevenue: 0
      },
      setAdminStats: (stats) => set({ adminStats: stats }),
      updateAdminStats: (updates) => set((state) => ({
        adminStats: { ...state.adminStats, ...updates }
      }))
    }),
    {
      name: 'ayursutra-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        user: state.user,
        therapySlots: state.therapySlots,
        bookings: state.bookings,
        waitlist: state.waitlist,
        feedbacks: state.feedbacks,
        payments: state.payments,
        notifications: state.notifications,
        adminStats: state.adminStats
      })
    }
  )
);
