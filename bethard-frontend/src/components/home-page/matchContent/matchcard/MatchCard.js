import { useState } from "react";
import "./MatchCard.css";
export const MatchCard = ({ index, match }) => {
  const [show, setShow] = useState(true);

  const matchDivider = () => {
    if (match.utcDate > new Date().getDate()) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  return (
    <div id="matchcard-container">
      <h4>
        Home: {match?.homeTeam?.name} / Away: {match?.awayTeam?.name}
      </h4>
      <h3>Score:</h3>
      <h4>Halftime / Fulltime</h4>
      <h4>
        Home: {match?.score?.halfTime?.home} / {match?.score?.fullTime?.home}
      </h4>
      <h4>
        Away: {match?.score?.halfTime?.away} / {match?.score?.fullTime?.away}
      </h4>
      <hr />
    </div>
  );
};
