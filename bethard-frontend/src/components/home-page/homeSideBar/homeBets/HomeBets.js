
import React, { useContext, useState, useEffect } from "react";
import "./HomeBets.css";
import API from "../../../../shared/api/services/findBets-service";
import { UserContext } from "../../../../shared/provider/UserProvider";
import { Loader } from "../../../../shared/loader/Loader";
import {BetCard} from "./BetCard/BetCard";
function HomeBets() {

    //Hämtar Context med hjälp av UserContext. från Userprovider.js, som en referens.
    const [user, setUser] = useContext(UserContext); 
    const [bets, setBets] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    const AllBets = async () => {
        setIsLoaded(false)
        try {
            const { data } = await API.betsForUser(user);
            setBets(data);
            setIsLoaded(true);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    const PlacedBets = () => {
        return isLoaded ? (
          <div className="info-box">
            <h2 id="match-title">Placed bets</h2>
            {bets?.map((bets, index) => {
              if (bets.paidOut != true) {
                return <BetCard key={index} bets={bets} />;
              }
            })}
          </div>
        ) : (
          <span>
            <Loader />
    
          </span>
        );
      };



  useEffect(() => {
    {
      AllBets();
    }
  }, []);



return(
    <main id="match-box-style">
            <section id="matchinfo">{PlacedBets()}</section>
           
        </main>
)
};

export default HomeBets;




//   return (
    // <main id="match-box-style">
    //   <section id="matchinfo">{Allbets()}</section>

    // </main>
//   );

//   const Bets = () => {
//     return isLoaded ? (
//       <div className="info-box">
//         <h2 id="match-title">Played Matches</h2>
//         {matches?.map((match, index) => {
//           if (match.status === "FINISHED") {
//             return <MatchCard key={index} match={match} />;
//           }
//         })}
//       </div>
//     ) : (
//       <span>
        
//         <div>Loading....</div>
//       </span>
//     );
//   };
//   const comingMatches = () => {
//     return isLoaded ? (
//       <div className="info-box">
//         <h2 id="match-title">Coming Matches</h2>
//         {matches?.map((match, index) => {
//           if (match.status != "FINISHED") {
//             return <MatchCard key={index} match={match} />;
//           }
//         })}
//       </div>
//     ) : (
//       <span>
//         <div>Loading....</div>
//       </span>
//     );
//   };