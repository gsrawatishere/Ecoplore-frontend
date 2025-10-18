import React, {createContext, useEffect, useState} from 'react'
import axiosInstance from '../api/axiosInstance';


export const UserContext = createContext({
    userId: null ,
    userRole : null
});

export const UserProvider = ({children})=>{
    const [userId , setUserId] = useState(null);
    const [userRole , setUserRole] = useState(null);
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async ()=>{
        
        try{
            const response = await axiosInstance.get("/private/me");
            if(response.status==200){
                setUserId(response.data.email);
                setUserRole(response.data.role);
                setIsLoggedIn(true);
            }
        }catch(error){
                console.log(error);
        }finally {
                setIsLoading(false);
            }
    };

    useEffect(()=>{
        fetchUser();
    },[])

    const value = {userId , userRole, isLoggedIn , setIsLoggedIn, setUserId,setUserRole ,isLoading}
    console.log(value);

    return(
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
    );

    

}
