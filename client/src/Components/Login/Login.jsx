// import React from 'react'

// import "./Login.css"
// import {useState} from "react";
// import {backendUrl} from "../../constants.js";

// const Login = () => { 

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <div id="login" className='flex-col'>
//       <h1>Login</h1>

//       <div className='signup-form'>

//         <div className='subform'>
//           <label htmlFor="email">Email: </label>
//           <input onChange={(e) => {
//             setEmail(e.target.value)
//           }} type="text" name='email' placeholder='Your Email' />
//         </div>

//         <div className='subform'>
//           <label htmlFor="password">Password: </label>
//           <input onChange={(e) => setPassword(e.target.value)} type="text" name='password' placeholder='Your Password' />
//         </div>

//         <button type="submit" id="test" onClick={async (e) => {
//           const response = await fetch(`http://localhost:3000/login`, {
//             method: "POST",
//             body: JSON.stringify({
//               email: email,
//               password: password
//             })
//           });

//           const json = await response.json();
//           localStorage.setItem("token", json.token);  //way to store token in browser local storage so that user gets logged in after refreshes
//         }}>Login</button>
//       </div>
//     </div>
//   )
// }

// export default Login ;

import { useContext, useState } from "react"
import {Navigate}  from 'react-router-dom'
//import { UserContext } from "../UserContext";
export default function LoginPage(){

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[redirect, setRedirect] = useState(false);
    //const {setUserInfo} = useContext(UserContext)
    async function login(e){
        e.preventDefault();
       const response =  await fetch('http://localhost:3000/login', {
            method:"POST",
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials:"include",
        });

        if(response.ok){
            response.json().then(userInfo=>{
                //setUserInfo(userInfo);
                console.log(userInfo);
                setRedirect(true);  
            })
            
        }else{
            alert("Wrong Credentials");
        }
    }

    if(redirect){
        return <Navigate  to =  {'/'} />
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>LogIn</h1>
            <input type="text" placeholder="username" value={username} onChange={e=> setUsername(e.target.value)}></input>
            <input type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}></input>
            <button>Login</button>
        </form>
    )
}