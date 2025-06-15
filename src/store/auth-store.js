import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MOCK_USERS } from '@/lib/constants'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const user = MOCK_USERS.find(
          u => u.email === email && u.password === password
        )
        
        if (user) {
          set({ 
            user: { 
              id: user.id, 
              email: user.email, 
              name: user.name, 
              role: user.role 
            }, 
            isLoading: false 
          })
          return { success: true }
        } else {
          set({ error: 'Invalid credentials', isLoading: false })
          return { success: false, error: 'Invalid credentials' }
        }
      },

      logout: () => {
        set({ user: null, error: null })
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
)