import React, { useEffect, useState } from'react';
import {useHistory} from 'react-router-dom'
const Login=(params)=>{
    const history=useHistory();
    const login=[{
        userName:'admin@admin.com',
        password:'admin@123'
    },{
        userName:'author@admin.com',
        password:'author@123'        
    },{
        userName:'client@admin.com',
        password:'client@123'
    },{
        userName:'user@admin.com',
        password:'user@123'
    }]
    const [user,setUser]=useState({
        name:'',
        password:''
    })
    const [loginState,setLoginState]=useState(false);
    const handleChange =(e)=>{
        setUser(prev=>({...user,
        [e.target.name]:e.target.value}))

    }
    useEffect(()=>{
        let userValue=JSON.parse(localStorage.getItem('userDetails'))
        if(userValue){
        login.map(value=>{
            if(value.userName===userValue.name && value.password===userValue.password){
                console.log("login success")
            document.getElementById('error').innerHTML="";
            history.push("/profile");
            }
            return 0;
        })
    }
        
    },[loginState]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        login.map(value=>{
            if(value.userName===user.name && value.password===user.password){
                localStorage.setItem('userDetails',JSON.stringify(user))
                setLoginState(!loginState);
            }
            return 0;
        })
        if(!loginState){
            document.getElementById('error').innerHTML="login credentials wrong!!"

        }   
    }
    return (
        <div style={{textAlign:"center"}}>
            <p id='error'></p>
            <form onSubmit={handleSubmit}>
                <label >Enter User name:</label><br></br>
                <input name='name' value={user.name} onChange={(e)=>{handleChange(e)}} /><br></br>
                <label>Enter Password:</label><br></br>
                <input type='password' name='password' value={user.password} onChange={(e)=>handleChange(e)} /><br></br>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}
export default Login;