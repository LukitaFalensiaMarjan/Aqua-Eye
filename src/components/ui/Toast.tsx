// ============================================================
// AQUA EYE — Toast Notification System
// ============================================================

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const iconMap = {
  success: CheckCircle,
  error: AlertOctagon,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: { bg: 'var(--color-safe)', border: '#000', text: '#000' },
  error: { bg: 'var(--color-danger)', border: '#000', text: '#fff' },
  warning: { bg: 'var(--color-caution)', border: '#000', text: '#000' },
  info: { bg: 'var(--color-aqua-blue)', border: '#000', text: '#fff' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message, duration }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type];
          const colors = colorMap[toast.type];
          return (
            <div
              key={toast.id}
              className="toast-item flex items-center gap-3 px-4 py-3 min-w-[300px] max-w-[420px]"
              style={{
                background: colors.bg,
                color: colors.text,
                border: `3px solid ${colors.border}`,
                boxShadow: `6px 6px 0px ${colors.border}`,
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
              }}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="flex-1 text-sm">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="flex-shrink-0 opacity-70 hover:opacity-100">
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
