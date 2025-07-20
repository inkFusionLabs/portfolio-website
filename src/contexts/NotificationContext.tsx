import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import Notification, { NotificationProps } from '../components/Notification'

interface NotificationState {
  notifications: Omit<NotificationProps, 'onClose'>[]
}

type NotificationAction = 
  | { type: 'ADD_NOTIFICATION'; payload: Omit<NotificationProps, 'onClose'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }

const initialState: NotificationState = {
  notifications: []
}

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          action.payload
        ]
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      }
    default:
      return state
  }
}

interface NotificationContextType {
  state: NotificationState
  dispatch: React.Dispatch<NotificationAction>
  showNotification: (notification: Omit<NotificationProps, 'id' | 'onClose'>) => void
  showSuccess: (title: string, message?: string) => void
  showError: (title: string, message?: string) => void
  showInfo: (title: string, message?: string) => void
  showWarning: (title: string, message?: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const showNotification = (notification: Omit<NotificationProps, 'id' | 'onClose'>) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2)
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { ...notification, id }
    })
  }

  const showSuccess = (title: string, message?: string) => {
    showNotification({ type: 'success', title, message })
  }

  const showError = (title: string, message?: string) => {
    showNotification({ type: 'error', title, message })
  }

  const showInfo = (title: string, message?: string) => {
    showNotification({ type: 'info', title, message })
  }

  const showWarning = (title: string, message?: string) => {
    showNotification({ type: 'warning', title, message })
  }

  return (
    <NotificationContext.Provider value={{
      state,
      dispatch,
      showNotification,
      showSuccess,
      showError,
      showInfo,
      showWarning
    }}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {state.notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={(id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
} 