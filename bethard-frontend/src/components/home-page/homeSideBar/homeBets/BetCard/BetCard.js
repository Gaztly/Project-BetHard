

export const BetCard = ({ bets, index, match }) => {
  const Won = () => {
    if(match.score.winner === null){return "Pending"}
   if(match.score.winner == "HOME_TEAM" && bets.betTeam == 1){ return  "Won"}
   else if(match.score.winner == "AWAY_TEAM" && bets.betTeam == 2){ return  "Won"}
  else  if(match.score.winner == "DRAW" && bets.betTeam == "X"){ return  "Won"}
  else {return "Lost"}
}

    return (
      <div id="betcard-container">
        <br />
        <br />
        <h4>
         HOME: {match.homeTeam.name} &nbsp; AWAY: {match.awayTeam.name} BET: {bets.betTeam} &nbsp; STAKE: {bets.betAmount} &nbsp;
         ODDS: {bets.oddsWhenBetsMade} &nbsp; OUTCOME: {Won()}
        </h4>
        <br />
        <hr />
      </div>
    );
  };
  