// import React from 'react'
// import { Link } from 'react-router-dom'

// import './Navbar.css'

// const Navbar = () => {
//   return (
//     <div id='navbar-main' className='flex-row'>
//       <Link to={'/'}>
//         <div className="logo-box flex-row"> 
//           <img className='logo' src="images.jpeg" alt="logo" /> 
//           <p>Code Village</p>
//         </div>
//       </Link>
//       <div className="nav-options">
//         <Link to={'/problemset/all/'} >Problems</Link>
//       </div>
//       <div className="nav-options">
//         <Link to={'/signup'} >Signup</Link>
//       </div>
//       <div className="nav-options">
//         <Link to={'/login'} >Login</Link>
//       </div>
//     </div>
//   )
// }
// //https://user-images.githubusercontent.com/63964149/152531278-5e01909d-0c2e-412a-8acc-4a06863c244d.png
// export default Navbar

import './Navbar.css'
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../../UserContext'

export default function Header(){
  const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(()=>{
    fetch('http://localhost:3000/profile',{
      credentials:"include",
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
      })
    })
  }, []);


  
  function logout(){

    fetch('http://localhost:3000/logout',{
      credentials:'include',
      method:'POST',
    })
   setUserInfo(null);
  }

  const username = userInfo?.username;
  
    return( <header>
        <Link to="/" className="logo">Code Village</Link>
        <nav>
          {username && (
            <>
            <span>Hello, {username}</span>
            <Link to="/create">Create New Problem</Link>
            <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            </>
          )}
          
        </nav>
      </header>);
}