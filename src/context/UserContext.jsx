import React, {createContext, useEffect, useState} from 'react'
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({
    userId: null ,
    userRole : null
});

export const UserProvider = ({children})=>{
    const [userId , setUserId] = useState(null);
    const [userRole , setUserRole] = useState(null);
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const fetchUser = async ()=>{
        try{
            const response = await axiosInstance.get("/private/me");
            if(response.status==200){
                setUserId(response.data.email);
                setUserRole(response.data.role);
                if(response.data.role === 'SELLER'){
                     navigate('/seller-dashboard')
                }
                setIsLoggedIn(true);
            }
        }catch(error){
                console.log(error);
        } 
    };

    useEffect(()=>{
        fetchUser();
    },[])

    const value = {userId , userRole, isLoggedIn , setIsLoggedIn, setUserId,setUserRole }
    console.log(value);

    return(
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
    );

    

}
