import React, {createContext, useState, useEffect} from 'react';
import AuthService from './services/AuthService';

export const UserContext = createContext();

export default ({children}) => {

  const [user, setUser] = useState(sessionStorage.getItem('session') ? sessionStorage.getItem('session').user : null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState({});
  const [showFeed, setShowFeed] = useState(true);

    useEffect(() => {

 
           const session = sessionStorage.getItem('session');
           
                    if (session) {
                      console.log('session: ', session);
                      const sessionData = JSON.parse(session);
                      console.log('sessionData: ', sessionData);
                          setUser(sessionData.user);
                          setIsAuthenticated(sessionData.isAuthenticated);
                          setToken(sessionData.token);
                          setIsLoaded(true);
                          setShowFeed(true);
                          setProfile({});
                    } 

                    else {
                      AuthService.isAuthenticated().then((data) => {
                          console.log('data from auth: ', data);
                  
                              if(data.user) {

                                    setUser(data.user);
                                    setIsAuthenticated(data.isAuthenticated);
                                    setToken(data.token);
                                    setIsLoaded(true);
                                    setShowFeed(true);
                                    setProfile({})
                                }
                          });
            }     
    }, []);

     return (
      <div>
        {isLoaded ? (
          <UserContext.Provider
            value={{ user, setUser, isAuthenticated, setIsAuthenticated, token, setToken, profile, setProfile, showFeed, setShowFeed }}
          >
            {children}
          </UserContext.Provider>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
};