import React, {createContext, useState, useEffect} from 'react';
import AuthService from './services/AuthService';

export const UserContext = createContext();

export default ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState({});
  const [showFeed, setShowFeed] = useState(true);

    useEffect(() => {
        AuthService.isAuthenticated().then((data) => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setToken(data.token);
            setIsLoaded(true);
            setShowFeed(true);
            setProfile({})
        });
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


// const UserContextProvider = (props) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [token, setToken] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
 
//     useEffect(() => {
//         AuthService.isAuthenticated(token).then((data) => {
//             setUser(data.user);
//             setIsAuthenticated(data.isAuthenticated);
//             setToken(data.token);
//             setIsLoaded(true);
//         })
//         .catch(console.error())
//     }, []);

    // const handleAuthData = (token) => {
    //   AuthService.isAuthenticated(token).then((data) => {
    //         setUser(data.user);
    //         setIsAuthenticated(data.isAuthenticated);
    //         setToken(data.token);
    //         setIsLoaded(true);
    //     })
    //     .catch(console.error())
    // }

//     return (
//       <div>
//         {isLoaded ? (
//           <UserContext.Provider
//             value={{ user, setUser, isAuthenticated, setIsAuthenticated, token, setToken }}
//           >
//             {props.children}
//           </UserContext.Provider>
//         ) : (
//           <h1>Loading...</h1>
//         )}
//       </div>
//     );
// }

// export default UserContextProvider;
