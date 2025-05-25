'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';


interface AuthContextType {
  userLoggedIn: boolean;
  setUserLoggedIn: (value: boolean) => void;
  userName: string;
  setUserName: (value: string) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
const [userName,setUserName]=useState('');
const [isAdmin, setIsAdmin] = useState(false);
  return (
    <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn,userName,setUserName,isAdmin,setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

