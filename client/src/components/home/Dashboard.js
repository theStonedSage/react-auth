import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Cookies, useCookies} from 'react-cookie';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {

    const [cookies] = useCookies(['token']);
    const [auth,setAuth] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:4000/getData',{
            headers:{
                Authorization:'JWT '+cookies.token
            }
        }).then(res=>{
        // console.log(res);
        if(res.data.auth){
            setAuth(true)
        }
        else{
            setAuth(false);
        }

        // console.log(res);
        
      }).catch(err=>{
        console.log(err)
      })
    },[])
    
    return (
       <>
        {auth?'access granted':auth==false?<Redirect to="/login" />:'loading'}
       </>
    )
}

export default Dashboard
