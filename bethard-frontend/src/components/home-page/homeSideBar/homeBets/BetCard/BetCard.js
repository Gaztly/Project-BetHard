export const BetCard = ({ bets, index, match }) => {
    const Won = () => {
        if (match.score.winner === null) {
            return "Pending";
        }
        if (match.score.winner == "HOME_TEAM" && bets.betTeam == 1) {
            return "Won";
        } else if (match.score.winner == "AWAY_TEAM" && bets.betTeam == 2) {
            return "Won";
        } else if (match.score.winner == "DRAW" && bets.betTeam == "X") {
            return "Won";
        } else {
            return "Lost";
        }
    };

    return (
        <div id="betcard-container">
            <br />
            <br />

            <div className="matchcard-team-header">
                <img
                    className="matchcard-team-logo"
                    src={match.homeTeam.crest}
                    alt=""
                />
                {match.homeTeam.name} - {match.awayTeam.name}
                <img
                    className="matchcard-team-logo"
                    src={match.awayTeam.crest}
                    alt=""
                />
            </div>
            <h4>
                BET: {bets.betTeam} &nbsp; STAKE: {bets.betAmount} &nbsp; ODDS:
                {bets.oddsWhenBetsMade} &nbsp; OUTCOME: {Won()} &nbsp; 
                RESULT: {match.score.fullTime.home} - {match.score.fullTime.away}
            </h4>
            <br />
            <hr />
        </div>
    );
};
