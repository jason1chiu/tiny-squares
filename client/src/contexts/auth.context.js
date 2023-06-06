import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const savedUserInfo = localStorage.getItem('user_info');
  const [user, setUser] = useState(savedUserInfo ? JSON.parse(savedUserInfo) : null);
  let [journals, setJournals] = React.useState([]);

  const categories = ["Mood", "Health", "Habit"];
  const editUser = (newUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  // Add this useEffect hook
  useEffect(() => {
    if (user) {
      localStorage.setItem('user_info', JSON.stringify(user));
    } else {
      localStorage.removeItem('user_info');
    }
  }, [user]);

  
  return <AuthContext.Provider value={{ user, setUser, editUser, categories, journals, setJournals }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export const useAuth = () => React.useContext(AuthContext);