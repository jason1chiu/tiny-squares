import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  let [user, setUser] = React.useState(null);

  const categories = ["Mood", "Health", "Habit"];
  const editUser = (newUserData) => {
    setUser({user: newUserData});
  };

  return (
    <AuthContext.Provider value={{ user, setUser, editUser, categories }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export const useAuth = () => React.useContext(AuthContext);
