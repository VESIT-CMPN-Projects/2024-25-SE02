import React, { createContext, useEffect, useState } from 'react'
// import { AsyncStorage } from 'react-native';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      // const storedUser = await AsyncStorage.getItem('user');
      // if(storedUser) setUser(JSON.parse(storedUser));
      setAuthLoading(false);
    }
    loadUser();
  }, []);

  const login = async (userData) => {
    // await AsyncStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = async (userData) => {
    // await AsyncStorage.removeItem('user')
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}