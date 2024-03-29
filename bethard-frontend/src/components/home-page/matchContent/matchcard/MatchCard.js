import "./MatchCard.css";
export const MatchCard = ({ index, match, setModalMatch, setBetModal }) => {
    const showModal = () => {
        if (match.status === "FINISHED") return;
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
                                {new Date(match.utcDate).toLocaleDateString(
                                    [],
                                    {
                                        month: "numeric",
                                        day: "numeric",
                                    }
                                )}
                                &nbsp;
                                {new Date(match.utcDate).toLocaleTimeString(
                                    [],
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </div>
                        )
                    ) : (
                        <div className="matchcard-scorecard-header scorecard-header-white">
                            {new Date(match.utcDate).toLocaleDateString([], {
                                month: "numeric",
                                day: "numeric",
                            })}
                        </div>
                    )}
                    <div className="matchcard-score">
                        <div className="matchcard-score-point">
                            {match.score.fullTime.home} -{" "}
                            {match.score.fullTime.away}
                        </div>
                    </div>
                    <div className="matchcard-score">
                        <div className="matchcard-score-point-halftime">
                            ({match.score.halfTime.home} -{" "}
                            {match.score.halfTime.away})
                        </div>
                    </div>
                </div>

                <section className="matchcard-odds">
                    <div className="matchcard-odds-header">1 / X / 2</div>

                    <div className="matchcard-odds-container">
                        <span className="matchcard-odds-value">
                            {match.odds.one}
                        </span>
                        <span className="matchcard-odds-value">
                            {match.odds.x}
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
