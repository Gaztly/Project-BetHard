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
    const [matchData, setMatchData] = useState();

  
    
  

    const AllBets = async () => {
        setIsLoaded(false);
        try {
            //innehåller data, headers body status osv från http callet.
            //responsen innehåller json object
            const response = await API.betsForUser(user);

            //error checking, om responsen inte är 200 så är det en error
            if (response.status !== 200) {
                setUser(null); //Sätter användaren till null om användarens token är ogiltig

                return;
            }

            const data = response.data;
            setBets(data);
      
            console.log(bets)
            const matchIds = data?.map(b => b.matchId);
            console.log(matchIds)
            //Visar mer utförligt hur den tar emot response från api, och sparar ner i response.
            //och tar datan från responsen  

            const responsetwo = await API.GetMatchById(matchIds);
            setMatchData(responsetwo.data);
            console.log(matchData)
            setIsLoaded(true);
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
                const match = matchData?.filter(x=> x.id == bets.matchId)[0];
                console.log(match)
                return <BetCard key={index} bets={bets} match={match} />;
              }
            })}
          </div>
        ) : (
            <span>
                <Loader />
            </span>
        );
  }

    useEffect(() => {
        {
            AllBets();
        }
    }, []);

    return (
        <main id="match-box-style">
            <section id="matchinfo">{PlacedBets()}</section>
        </main>
    );
}

export default HomeBets;

//sparar ner alla match id i en array, som man ssedan skickar till BE, där man sedan 
// en post i users, som skickar data till den. datan du skickar är en array av match ID'en
//en ny model utan controller, bara array av ints. 
// _context.matches(include).Where(x=> x.id == match.id )
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
