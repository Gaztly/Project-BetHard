import { useState } from "react";
import "./MatchCard.css";
export const MatchCard = ({ index, match }) => {
  return (
    <div id="matchcard-container">
      <br />
      <br />
      <h4>
        Home: {match?.homeTeam?.name} / Away: {match?.awayTeam?.name}
      </h4>
      <br />
      <h3>Score:</h3>
      <h4>Halftime&nbsp; |&nbsp; Fulltime</h4>
      <h4>
        <br />
        Home: {match?.score?.halfTime?.home} | {match?.score?.fullTime?.home}
      </h4>

      <h4>
        Away: {match?.score?.halfTime?.away}&nbsp; |{" "}
        {match?.score?.fullTime?.away}
      </h4>
      <br />

      <section className="odds">
        <h3> Odds &nbsp; </h3>

        <p>
          1: {match.odds?.one} &nbsp; X: {match?.odds?.cross} &nbsp; 2:{" "}
          {match?.odds?.two}
        </p>
      </section>

      <hr />
    </div>
  );
};
