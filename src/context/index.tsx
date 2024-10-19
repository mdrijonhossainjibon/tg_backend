import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';

interface AuthContextProps {
  uid: string | null;
  role: string | null;
  authorized: boolean;
  login: (uid: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook to access the auth context
export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Logic to determine if user is authorized based on uid and role
  const authorized = !!uid && !!role;

  // Simulated login function
  const login = (uid: string, role: string) => {
    setUid(uid);
    setRole(role);
  };

  // Simulated logout function
  const logout = () => {
    setUid(null);
    setRole(null);
  };

  useEffect(() => {
    // Here you can add logic to initialize the context with existing user info
    // For example, you could check if there's an active session stored in local storage or a cookie
    const storedUid = localStorage.getItem('uid');
    const storedRole = localStorage.getItem('role');
    if (storedUid && storedRole) {
      login(storedUid, storedRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ uid, role, authorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
