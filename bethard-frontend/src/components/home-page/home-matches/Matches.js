import getMatchesPl from "../../../shared/api/services/footballServices/getMatchesPl"

import React from 'react';
import  Axios  from "axios";
import dotenv from "dotenv"



function Matches() {
    // const [match, setMatch] = useState("")
    reuquire("dotenv").config();
    Axios.get(`"https://api.football-data.org/v4/PL/matches?api_key=${process.env.REACT_APP_FOOTBALL-TOKEN}`).then(response =>{
        console.log(response)
    // setMatch(response.data)
    })
    //  console.log(response.matches.id)
    
//    response.map(match => {
//         return(
//              {match.matches.map( data =>{
//                  return(
//                      <div key={match.matches.id}
//                      {data.id.hometeam}
//                      </div>
//                  )
//              })}   
                
            
//         )
//     }))
}

export default Matches

// function Matches() 
//     const response = getMatchesPl()
//     const data = response.data;
    
// console.log(data.map())

   



