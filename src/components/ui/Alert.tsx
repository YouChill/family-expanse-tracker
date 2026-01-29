// src/components/ui/Alert.tsx
import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  X,
} from 'lucide-react'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  onClose?: () => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, onClose, className, children, ...props }, ref) => {
    const variants = {
      info: {
        container: 'bg-blue-50 border-blue-200 text-blue-800',
        icon: <Info className="h-5 w-5 text-blue-500" />,
      },
      success: {
        container: 'bg-green-50 border-green-200 text-green-800',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      },
      warning: {
        container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      },
      error: {
        container: 'bg-red-50 border-red-200 text-red-800',
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      },
    }

    const { container, icon } = variants[variant]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex gap-3 p-4 rounded-lg border',
          container,
          className
        )}
        {...props}
      >
        <div className="flex-shrink-0">{icon}</div>

        <div className="flex-1 min-w-0">
          {title && (
            <h5 className="font-medium mb-1">{title}</h5>
          )}
          <div className="text-sm">{children}</div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 p-1 -m-1 rounded hover:bg-black/5 transition-colors"
            aria-label="Zamknij alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export { Alert }
