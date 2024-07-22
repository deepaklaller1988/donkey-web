import User from '@lib/User';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  username:string;
  setUsername:(tab: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function ProfileTabProvider({ children }: AuthProviderProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userDetails = await User.role();
        if (userDetails) {
          setUsername(userDetails.username);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const value = {
    activeTab,
    setActiveTab,
    username,
    setUsername
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useProfileTab() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
