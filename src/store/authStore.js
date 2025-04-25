// import { create } from 'zustand';

// const useAuthStore = create((set) => ({
//   user: null,
//   isAuthenticated: false,
//   role: null,

//   login: (userData) => set({
//     user: userData,
//     isAuthenticated: true,
//     role: userData.role,
//   }),

//   logout: () => {
//     set({
//       user: null,
//       isAuthenticated: false,
//       role: null,
//     });
//     window.location.href = '/login';
//   },
// }));

// export default useAuthStore;
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,
  notifications: [],

  login: (userData) => set({
    user: userData,
    isAuthenticated: true,
    role: userData.role,
  }),

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      role: null,
      notifications: [],
    });
    window.location.href = '/login';
  },

  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { id: Date.now(), ...notification }]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id)
  })),
}));

export default useAuthStore;