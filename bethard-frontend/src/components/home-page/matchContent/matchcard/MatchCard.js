import { useState } from "react";
import "./MatchCard.css";
export const MatchCard = ({ index, match, setModalMatch, setBetModal }) => {
    const showModal = () => {
        setModalMatch(match);
        setBetModal(true);
    };

    return (
        <>
            <div id="matchcard-container" onClick={() => showModal()}>
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
                <div className="matchcard-scorecard">
                    {match.status !== "FINISHED" ? (
                        match.status === "IN_PLAY" ? (
                            <div className="matchcard-scorecard-header">
                                Playing
                            </div>
                        ) : (
                            <div className="matchcard-scorecard-header scorecard-header-white">
                                {new Date(match.utcDate).toLocaleTimeString(
                                    [],
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </div>
                        )
                    ) : null}
                    <div className="matchcard-score">
                        <h3 className="matchcard-score-point">
                            {match.score.fullTime.home} -{" "}
                            {match.score.fullTime.away}
                        </h3>
                    </div>
                    <div className="matchcard-score">
                        <h4 className="matchcard-score-point-halftime">
                            ({match.score.halfTime.home} -{" "}
                            {match.score.halfTime.away})
                        </h4>
                    </div>
                </div>

                <section className="matchcard-odds">
                    <div className="matchcard-odds-header">1 / X / 2</div>

                    <div className="matchcard-odds-container">
                        <span className="matchcard-odds-value">
                            {match.odds.one}
                        </span>
                        <span className="matchcard-odds-value">
                            {match.odds.cross}
                        </span>
                        <span className="matchcard-odds-value">
                            {match.odds.two}
                        </span>
                    </div>
                </section>
            </div>
            <hr />
        </>
    );
};
