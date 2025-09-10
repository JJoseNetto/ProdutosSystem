import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  token: string | null
  user: any | null
  isLoading: boolean
  setToken: (token: string) => void
  setUser: (user: any) => void
  logout: () => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoading: false,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),

      logout: () => set({ token: null, user: null, isLoading: false }),
      clearAuth: () => set({ token: null, user: null })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage;
        return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
      }),
    }
  )
)

export const useAuthToken = () => useAuthStore((state) => state.token);
