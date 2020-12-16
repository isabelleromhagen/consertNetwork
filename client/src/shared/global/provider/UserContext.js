import React, {createContext, useState, useEffect} from 'react';
import AuthService from '../../api/service/AuthService';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
 
    useEffect(() => {
        AuthService.isAuthenticated(token).then((data) => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setToken(data.token);
            setIsLoaded(true);
        })
        .catch(console.error())
    }, []);

    return (
      <div>
        {isLoaded ? (
          <UserContext.Provider
            value={{ user, setUser, isAuthenticated, setIsAuthenticated, token, setToken }}
          >
            {props.children}
          </UserContext.Provider>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
}

export default UserContextProvider;