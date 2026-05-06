import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { AuthService, type User } from './authService'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthContextType {
  state: AuthState
  login: (username: string, password: string) => Promise<void>
  register: (userData: { email: string; password: string; username: string; role: string }) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT_START' }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'LOGOUT_FAILURE'; payload: string }
  | { type: 'CHECK_AUTH_START' }
  | { type: 'CHECK_AUTH_SUCCESS'; payload: User }
  | { type: 'CHECK_AUTH_FAILURE'; payload: string }
  | { type: 'CLEAR_ERROR' }

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
    case 'LOGOUT_START':
    case 'CHECK_AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'CHECK_AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
    case 'LOGOUT_FAILURE':
    case 'CHECK_AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      }

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = async (username: string, password: string) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const response = await AuthService.login({ username, password })
      if (response.success && response.data) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: response.message || 'Login failed' })
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.message : 'An unexpected error occurred' })
    }
  }

  const register = async (userData: { email: string; password: string; username: string; role: string }) => {
    dispatch({ type: 'REGISTER_START' })
    try {
      const response = await AuthService.register(userData)
      if (response.success && response.data) {
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data })
      } else {
        dispatch({ type: 'REGISTER_FAILURE', payload: response.message || 'Registration failed' })
      }
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error instanceof Error ? error.message : 'An unexpected error occurred' })
    }
  }

  const logout = async () => {
    dispatch({ type: 'LOGOUT_START' })
    try {
      const response = await AuthService.logout()
      if (response.success) {
        dispatch({ type: 'LOGOUT_SUCCESS' })
      } else {
        dispatch({ type: 'LOGOUT_FAILURE', payload: response.message || 'Logout failed' })
      }
    } catch (error) {
      dispatch({ type: 'LOGOUT_FAILURE', payload: error instanceof Error ? error.message : 'An unexpected error occurred' })
    }
  }

  const checkAuth = async () => {
    dispatch({ type: 'CHECK_AUTH_START' })
    try {
      const response = await AuthService.getCurrentUser()
      if (response.success && response.data) {
        dispatch({ type: 'CHECK_AUTH_SUCCESS', payload: response.data })
      } else {
        dispatch({ type: 'CHECK_AUTH_FAILURE', payload: response.message || 'Authentication check failed' })
      }
    } catch (error) {
      dispatch({ type: 'CHECK_AUTH_FAILURE', payload: error instanceof Error ? error.message : 'An unexpected error occurred' })
    }
  }

  // Check authentication on app load
  useEffect(() => {
    checkAuth()
  }, [])

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
