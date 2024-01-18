import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./ProblemsPage.css"
import {backendUrl} from "../../constants.js";


const ProblemsPage = () => {
  const [CodeSeg, setCodeSeg] = useState("") ;
  const { pid } = useParams() ;  //use params mean dynamic url i.e. :1 i.e problem id 
  const cleanId = pid.substring(1) ;
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("cpp");

    const init = async () => {
      const response = await fetch(`http://localhost:3000/problems/` + cleanId, {
        method: "GET",
      });

      const json = await response.json();
      setProblem(json.problem);
    }

  useEffect(() => {
    init();
  }, [])
  // console.log(cleanId) ;


  const handleKey = (event) => {
    if (event.key == "Tab"){
      event.preventDefault() ;
      const { selectionStart , selectionEnd , value } = event.target ;
      const val = value.substring(0,selectionStart) + "\t" + value.substring(selectionStart) ;
      event.target.value = val;
      event.target.selectionStart = event.target.selectionEnd = selectionStart+1;
    }
    setCodeSeg(event.value) ;
  }

  const handleSubmit = async ()=>{
    const payload = {
      language : language,
      code : code,
    };
    try{
      const {data}  = await axios.post("http://localhost:3000/run", payload);
      setResult(data.output);
      console.log(data);
    }catch({response}){
      setResult(err.message);
      console.log(err);
    }
    
  }

  return (
    <div>

      {
        problem? (
          <div id="problempage" className='flex-row'>
            <div className="ques">
              <h1>{problem.tittle}</h1>
              <h5>Description</h5>
              <p>{problem.description}</p>
              <code>Input : {problem.exampleIn}</code>
              <code>Output : {problem.exampleOut}</code>
            </div>
            <div className="code">
              <h1>Code Here</h1>
              <div>
                <label>Language:  </label>
                <select value={language} onChange={(e)=>{
                  setLanguage(e.target.value);
                  console.log(e.target.value);
                }}>
                  <option value= "cpp">c++</option>
                  <option value="py">python</option>
                </select>
              </div>
              <br/>
              <div className='code-form'>
                <textarea value = {code} onChange={(e) => setCode(e.target.value)} name="SolvedCode" onKeyDown={ (event) => handleKey(event) }></textarea>
                <button type="submit" id="submit" onClick={handleSubmit}>SubmitCode</button>
                <p>{result}</p>
              </div>
            </div>
          </div>
        ) :
        (<div>The searched Question Doesn't exist</div>)
      }

    </div>
    
  )
}


// onClick={async () => {
//   const response = await fetch(`http://localhost:3000/submission`, {
//     method: "POST",
//     headers: {
//       "authorization": localStorage.getItem("token")
//     },
//     body: JSON.stringify({
//       problemID: cleanId,
//       submission: submission
//     })
//   });

//   const json = await response.json();
//   console.log(json);

// }}
export default ProblemsPage