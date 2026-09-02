// ============================================================
// AQUA EYE — Auth Context (Prototype)
// ============================================================

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserProfile } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const demoOperator: UserProfile = {
  name: 'Operator AQUA EYE',
  role: 'operator',
  roleLabel: 'Operator Lapangan',
  area: 'Sungai Cikapundung, Bandung',
  email: 'operator@aquaeye.id',
  phone: '+62 812 3456 7890',
  joinDate: '2026-01-15',
  lastLogin: '2026-09-02T18:00:00+07:00',
};

const demoWarga: UserProfile = {
  name: 'Warga Bandung',
  role: 'warga',
  roleLabel: 'Masyarakat Umum',
  email: 'warga@gmail.com',
  phone: '+62 899 9999 9999',
  joinDate: '2026-08-01',
  lastLogin: '2026-09-02T18:00:00+07:00',
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (username: string, password: string): boolean => {
    if (username === 'operator' && password === 'sft2026') {
      setIsAuthenticated(true);
      setUser(demoOperator);
      return true;
    }
    if (username === 'warga' && password === 'sft2026') {
      setIsAuthenticated(true);
      setUser(demoWarga);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
