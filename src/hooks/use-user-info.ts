import { useState, useEffect } from "react";

export type UserInfo = {
  name: string;
  email: string;
};

const STORAGE_KEY = "dsa_launchpad_user_info";

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user info from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUserInfo(JSON.parse(stored));
      }
    } catch (err) {
      console.error("[User Info Load Error]", err);
    }
    setLoading(false);
  }, []);

  // Save user info to localStorage
  const saveUserInfo = (info: UserInfo) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
      setUserInfo(info);
      return true;
    } catch (err) {
      console.error("[User Info Save Error]", err);
      return false;
    }
  };

  // Clear user info
  const clearUserInfo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setUserInfo(null);
      return true;
    } catch (err) {
      console.error("[User Info Clear Error]", err);
      return false;
    }
  };

  return {
    userInfo,
    loading,
    saveUserInfo,
    clearUserInfo,
  };
}
