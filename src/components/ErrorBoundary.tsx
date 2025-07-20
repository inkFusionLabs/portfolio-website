import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, Settings } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
    
    // Log error to console for debugging
    console.group('🚨 OmniFusion Music Error')
    console.error('Error:', error)
    console.error('Error Info:', errorInfo)
    console.error('Component Stack:', errorInfo.componentStack)
    console.groupEnd()
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  handleGoToSettings = () => {
    window.location.href = '/settings'
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
          <div className="glass-effect rounded-xl p-8 max-w-md w-full text-center space-y-6">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
              <p className="text-gray-400">
                We encountered an unexpected error. Don't worry, your music is safe.
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="text-left space-y-2">
                <details className="bg-gray-800/50 rounded-lg p-3">
                  <summary className="text-sm font-medium text-gray-300 cursor-pointer">
                    Error Details (Development)
                  </summary>
                  <div className="mt-2 space-y-2">
                    <p className="text-xs text-red-400 font-mono">
                      {this.state.error.message}
                    </p>
                    {this.state.errorInfo && (
                      <pre className="text-xs text-gray-500 font-mono whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full px-6 py-3 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={this.handleGoHome}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                
                <button
                  onClick={this.handleGoToSettings}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Support Info */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>If this problem persists, please check your connection and try again.</p>
              <p>Error ID: {Date.now().toString(36)}</p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 