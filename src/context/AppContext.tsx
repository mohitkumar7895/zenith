'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ContactLead, DbStatus } from '@/models/types';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isModalOpen: boolean;
  selectedService: string;
  isSubmitting: boolean;
  dbStatus: DbStatus | null;
  notifications: Notification[];
  openConsultationModal: (serviceName?: string) => void;
  closeConsultationModal: () => void;
  submitContactForm: (formData: Omit<ContactLead, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  dismissNotification: (id: string) => void;
  refreshDbStatus: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Custom Website Development');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize theme from storage and sync DOM
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('zenith_theme') as 'dark' | 'light' | null;
      const initialTheme = savedTheme || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      setTheme(initialTheme);
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (_) {}
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('zenith_theme', nextTheme);
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-theme', 'light');
        }
      } catch (_) {}
      return nextTheme;
    });
  };

  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      dismissNotification(id);
    }, 6000);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const openConsultationModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsModalOpen(true);
  };

  const closeConsultationModal = () => {
    setIsModalOpen(false);
  };

  const refreshDbStatus = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setDbStatus({
          connected: data.connected,
          database: data.database,
          host: data.host,
          error: data.message,
        });
      }
    } catch {
      setDbStatus({
        connected: false,
        database: 'zenith_it_db',
        host: 'localhost',
        error: 'Network error checking MySQL status',
      });
    }
  };

  useEffect(() => {
    refreshDbStatus();
  }, []);

  const submitContactForm = async (formData: Omit<ContactLead, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        addNotification(
          'success',
          result.savedToMysql
            ? 'Inquiry received! Saved directly to MySQL database. An architect will contact you.'
            : 'Inquiry received! Stored in memory fallback. An architect will reach out shortly.'
        );
        closeConsultationModal();
        return true;
      } else {
        addNotification('error', result.message || 'Failed to submit inquiry.');
        return false;
      }
    } catch {
      addNotification('error', 'Error connecting to server. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isModalOpen,
        selectedService,
        isSubmitting,
        dbStatus,
        notifications,
        openConsultationModal,
        closeConsultationModal,
        submitContactForm,
        dismissNotification,
        refreshDbStatus,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl backdrop-blur-md border text-sm flex items-start justify-between gap-3 transition-all duration-300 animate-slide-in ${
              n.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100 shadow-emerald-950/50'
                : n.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-100 shadow-rose-950/50'
                : 'bg-amber-950/90 border-amber-500/40 text-amber-100 shadow-amber-950/50'
            }`}
          >
            <p className="font-medium leading-relaxed">{n.message}</p>
            <button
              onClick={() => dismissNotification(n.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
