import { useAuthStore } from '@/store/auth-store'

export function useAuth() {
  const { user, isLoading, error, login, logout, clearError } = useAuthStore()

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    clearError,
    isAuthenticated: !!user,
    isManager: user?.role === 'manager',
    isDeveloper: user?.role === 'developer'
  }
}