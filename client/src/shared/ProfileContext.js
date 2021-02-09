import React, {createContext, useState, useEffect} from 'react';
import AuthService from './services/AuthService';

export const ProfileContext = createContext();

export default ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then((data) => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setToken(data.token);
            setIsLoaded(true);
        });
    }, []);

     return (
      <div>
        {isLoaded ? (
          <ProfileContext.Provider
            value={{ user, setUser, isAuthenticated, setIsAuthenticated, token, setToken }}
          >
            {children}
          </ProfileContext.Provider>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
};