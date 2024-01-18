import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import "./AllProblems.css"
import { backendUrl } from "../../constants.js";

const AllProblemsPage = () => {
  const [problems, setProblems] = useState([]);

  const init = async () => {
    const response = await fetch(`http://localhost:3000/problems`, {
      method: "GET",
    });

    const json = await response.json();
    setProblems(json.problems);
  }

  useEffect(() => { //this hook is used to tell react what to do when second argument changes , in this case it is empty that means it runs init() method when allproblems page first renders
    init()
  }, []); 

  return (
    <div id="allproblems">
      <table>
        <tbody>

          <tr>
            <th>Tittle</th>
            <th>Difficulty</th>
            <th>Acceptance</th>
          </tr>

          {problems.map((prob,index) => (
            <tr>
              <Link to={`/problems/:${prob.problemID}`}>
                <td>{prob.tittle}</td>
              </Link>
              <td className={`${prob.difficulty}`} >{prob.difficulty}</td>
              <td className={`${prob.difficulty}`} >{prob.acceptance}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default AllProblemsPage