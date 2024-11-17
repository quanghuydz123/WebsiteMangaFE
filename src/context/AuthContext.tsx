import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  userId: string | null;
  userEmail: string | null;
  userAvatar: string | null;
  token: string | null;
  setAuthInfo: (id: string, email: string, avatar: string, token: string) => void;
  clearAuthInfo: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const email = localStorage.getItem("userEmail");
    const avatar = localStorage.getItem("userAvatar");
    const token = localStorage.getItem("token");

    if (id && email && avatar && token) {
      setUserId(id);
      setUserEmail(email);
      setUserAvatar(avatar);
      setToken(token)
    }
  }, []);

  const setAuthInfo = (id: string, email: string, avatar: string, token: string) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userAvatar", avatar);
    localStorage.setItem("token", token);

    setUserId(id);
    setUserEmail(email);
    setUserAvatar(avatar);
    setToken(token);
  };

  const clearAuthInfo = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("token");

    setUserId(null);
    setUserEmail(null);
    setUserAvatar(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ userId, userEmail, userAvatar, token, setAuthInfo, clearAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
