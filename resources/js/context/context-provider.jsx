import { createContext, useContext, useState } from "react";


const StateContext = createContext({
    currentUser: null,
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {}
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('TOKEN') : '');
  console.log('tok',userToken);
  console.log('user',currentUser);
  // console.log(localStorage)
   
  const setUserToken = (token) => {
    if(token){
        localStorage.setItem('TOKEN', token);
    }
    else{
        localStorage.removeItem('TOKEN');
    }
    _setUserToken(token);
  }
  
  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const userStateContext = () => useContext(StateContext);