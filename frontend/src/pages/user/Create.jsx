import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserNav from '../../components/ui/user/UserNav';

const Create = () => {
    const [user , setUser] = useState(null);
    const getUser = async()=>{
        try {
            const res =await axios.get(`${import.meta.env.VITE_BACKEND}/auth/user`,{
                withCredentials : true
            });
            
            setUser(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getUser()
    },[])
    if(!user){
        return <div>Loading....</div>
    }
  return (
    <div>
        <div>
            <UserNav user={user}/>
        </div>
    </div>
  )
}

export default Create