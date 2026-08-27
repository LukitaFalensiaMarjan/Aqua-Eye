// ============================================================
// AQUA EYE — Modal
// ============================================================

import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      <div
        className={`brutal-card w-full ${sizeMap[size]} max-h-[85vh] overflow-y-auto p-0 animate-slide-in-up`}
        style={{
          background: 'var(--color-surface-2)',
          border: '3px solid #000',
          boxShadow: '8px 8px 0px #000',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            borderBottom: '3px solid #000',
            background: 'var(--color-surface-3)',
          }}
        >
          <h3 className="text-lg font-bold font-heading text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            style={{
              border: '2px solid #000',
              background: 'var(--color-surface-2)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
