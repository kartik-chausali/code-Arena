// import React, { useState } from "react";

// import "./Signup.css";
// import { backendUrl } from "../../constants.js";
// const Signup = () => {
  
//   const [email, setemail] = useState("");
//   const [password , setpassword] = useState("");

//   return (
//     <div id='signup' className='flex-col'>
//       <h1>Signup</h1>
//       <div className='signup-form'>

//         <div className='subform'>
//           <label htmlFor='email'>Email: </label>
//           <input value = {email} onChange={(e)=>{
//             setemail(e.target.value);
//           }} type="text" placeholder="your email"
//           />
//         </div>

//         <div className='subform'>
//           <label htmlFor='password'>Password: </label>
//           <input value={password} onChange={(e)=>{
//             setpassword(e.target.value);
//           }} type="text" placeholder="password"
//           />
//         </div>

//         <button type='submit' id='test' onClick={async (e) =>{
//           const respone = await fetch( "http://localhost:3000/signup", {
//             method: "POST",
//             body: JSON.stringify({
//               email: email,
//               password: password,
//             }),
//           });

//           const json = await respone.json();
//           console.log(json);
//         }}
//         >
//           SIGNUP
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react"

export default function RegisterPage(){

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    async function register(e){
        e.preventDefault();
       const response = await fetch('http://localhost:3000/signup',{
            method:'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if(response.ok){
          alert("registration successfull")
        }else{
          aler("registration failed")
        }
    }
    return(
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" placeholder="username" value={username} onChange={e=> setUsername(e.target.value)}></input>
            <input type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}></input>
            <button>Register</button>
        </form>
    )
}

// neetcode1@gmail.com
