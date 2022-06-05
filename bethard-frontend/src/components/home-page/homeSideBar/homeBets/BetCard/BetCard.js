

export const BetCard = ({ bets, index, match }) => {
    return (
      <div id="betcard-container">
        <br />
        <br />
        <h4>
         BetID: {bets.id} {match.homeTeam.name}
        </h4>
        <br />
        <hr />
      </div>
    );
  };
  