import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken } from '@lib/userToken';

const AuthContext :any= createContext({ token: "", setToken: () => {} });

export function AuthProvider({ children }:any) {
  const [token, setToken] = useState<any>("");

  useEffect(() => {
    const fetchToken = async () => {
      const token:any = await getToken;
      setToken(token);
    };
    
    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
