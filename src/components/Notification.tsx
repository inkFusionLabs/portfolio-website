import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

export interface NotificationProps {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

const notificationStyles = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-400',
    textColor: 'text-green-400'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-400',
    textColor: 'text-red-400'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    textColor: 'text-blue-400'
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    textColor: 'text-yellow-400'
  }
}

export default function Notification({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose 
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const styles = notificationStyles[type]
  const Icon = styles.icon

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose(id), 300) // Wait for animation
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(id), 300) // Wait for animation
  }

  return (
    <div
      className={`glass-effect rounded-lg p-4 border transition-all duration-300 transform ${
        isVisible 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-full opacity-0'
      } ${styles.bgColor} ${styles.borderColor}`}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.iconColor}`} />
        
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium ${styles.textColor}`}>
            {title}
          </h4>
          {message && (
            <p className="text-xs text-gray-300 mt-1">
              {message}
            </p>
          )}
        </div>

        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 