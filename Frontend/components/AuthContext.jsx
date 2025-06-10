import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setAuthLoading(true);
        const storedUser = await AsyncStorage.getItem('user');
        if(storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch(err) {
        console.log("Error : " + err);
      } finally {
        setAuthLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (userData) => {
    setAuthLoading(true);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setAuthLoading(false);
  }

  const logout = async () => {
    setAuthLoading(true);
    await AsyncStorage.removeItem('user');
    setUser(null);
    setAuthLoading(false);
  }

  return(
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}