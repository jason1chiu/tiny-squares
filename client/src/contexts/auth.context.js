import React from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  let [user, setUser] = React.useState(null);
  let [journals, setJournals] = React.useState([]);
  
  const categories = ["Mood", "Health", "Habit"];
  const editUser = (newUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  return <AuthContext.Provider value={{ user, setUser, editUser, categories, journals, setJournals }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export const useAuth = () => React.useContext(AuthContext);