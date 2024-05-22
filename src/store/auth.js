// store/auth.js
import { create } from "zustand";

const useAuthStore = create(set => ({
  user: null,
  isAuthenticated: false,
  setUser: user => set({ user }), 
  setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export { useAuthStore };
