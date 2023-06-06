import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  let [ cookies, setCookie, removeCookie ] = useCookies();
  let [user, setUser] = React.useState(null);
  let [journals, setJournals] = React.useState([]);
  
  const categories = ["Mood", "Health", "Habit"];
  const editUser = (newUserData) => {
    setUser(prevUser => {
      prevUser.user.username = newUserData.username
      return {...prevUser}
    });
  };

  return <AuthContext.Provider value={{ user, setUser, editUser, categories, journals, setJournals }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export const useAuth = () => React.useContext(AuthContext);