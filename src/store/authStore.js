// // import { create } from 'zustand';

// // const useAuthStore = create((set) => ({
// //   user: null,
// //   isAuthenticated: false,
// //   role: null,

// //   login: (userData) => set({
// //     user: userData,
// //     isAuthenticated: true,
// //     role: userData.role,
// //   }),

// //   logout: () => {
// //     set({
// //       user: null,
// //       isAuthenticated: false,
// //       role: null,
// //     });
// //     window.location.href = '/login';
// //   },
// // }));

// // export default useAuthStore;
// import { create } from 'zustand';

// const useAuthStore = create((set) => ({
//   user: null,
//   isAuthenticated: false,
//   role: null,
//   notifications: [],

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
//       notifications: [],
//     });
//     window.location.href = '/login';
//   },

//   addNotification: (notification) => set((state) => ({
//     notifications: [...state.notifications, { id: Date.now(), ...notification }]
//   })),

//   removeNotification: (id) => set((state) => ({
//     notifications: state.notifications.filter((n) => n.id !== id)
//   })),
// }));

// export default useAuthStore;

// src/store/authStore.ts


// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   department?: string;
// }

// interface Notification {
//   id: string;
//   message: string;
//   type: 'info' | 'warning' | 'error' | 'success';
//   read: boolean;
//   timestamp: Date;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   notifications: Notification[];
//   login: (params: { user: User; token: string }) => void;
//   logout: () => void;
//   addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
//   markNotificationAsRead: (id: string) => void;
// }


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      notifications: [],

      login: ({ user, token }) => {
        set({
          user,
          token,
          notifications: [],
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          notifications: [],
        });
        // Consider using React Router's navigate instead of window.location
      },

      addNotification: (notification) => {
        const newNotification = {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },

      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);



export default useAuthStore;