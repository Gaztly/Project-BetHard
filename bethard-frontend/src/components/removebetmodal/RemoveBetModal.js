import React, { useContext, useRef, useState } from "react";
import "./RemoveBetModal.css";
import crossMark from "../../shared/img/icons/cross-mark.svg";
import { UserContext } from "../../shared/provider/UserProvider";
import { useNavigate } from "react-router-dom";
import removeBet from "../../shared/api/services/removeBet-service";

function RemoveBetModal({ match, bet, setShowModal }) {
    const [user, setUser] = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState();
    const modalRef = useRef();
    const navigate = useNavigate();

    const submit = async () => {
        const response = await removeBet.removeBetForUser(user, bet);
        if (response.status !== 200) {
            setErrorMessage(response.data);
            return;
        }
        setShowModal(false);

        navigate(0);
    };

    const clickOutside = (e) => {
        if (!modalRef.current || modalRef.current.contains(e.target)) return;
        setShowModal(false);
    };

    const exit = () => {
        setShowModal(false);
    };

    return (
        <div className="bet-modal-wrapper" onClick={(e) => clickOutside(e)}>
            <div ref={modalRef} className="bet-modal">
                <div className="bet-modal-teams">
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
                <div className="bet-modal-input-container">
                    <h4>
                        BET: {bet.betTeam} &nbsp; STAKE: {bet.betAmount} &nbsp;
                        ODDS:
                        {bet.oddsWhenBetsMade} &nbsp;
                    </h4>
                    {errorMessage !== "" ? (
                        <p className="bet-error-message">{errorMessage}</p>
                    ) : null}
                    <button className="bet-modal-btn" onClick={() => submit()}>
                        Remove bet
                    </button>

                    <div className="bet-modal-close-wrapper">
                        <div className="bet-modal-close" onClick={() => exit()}>
                            <img
                                className="bet-modal-cross"
                                src={crossMark}
                                alt="exit"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RemoveBetModal;
