import React, { useContext, useEffect, useRef, useState } from "react";
import "./AddBetModal.css";
import crossMark from "../../shared/img/icons/cross-mark.svg";
import addBet from "../../shared/api/services/addBet-service";
import { UserContext } from "../../shared/provider/UserProvider";
import validateUser from "../../shared/api/services/validate-service";
import { useNavigate } from "react-router-dom";

function AddBetModal({ match, setBetModal }) {
    const [user, setUser] = useContext(UserContext);
    const [radioValue, setRadioValue] = useState("X");
    const [betAmount, setBetAmount] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const modalRef = useRef();
    const crossRef = useRef();
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        const response = await addBet.addBetForUser(user, {
            betAmount: betAmount,
            matchId: match.id,
            oddsWhenBetsMade:
                radioValue === "1"
                    ? match.odds.one
                    : radioValue === "X"
                    ? match.odds.cross
                    : match.odds.two,
            betTeam: radioValue,
        });
        if (response.status !== 200) {
            setErrorMessage(response.data);
            return;
        }
        setBetModal(false);

        navigate(0);
        // updateUser();                behöver uppdatera plånboken. walletcontroller?
    };

    const updateUser = async () => {
        const newUser = await validateUser(user);
        setUser(newUser);
    };

    const exit = () => {
        setBetModal(false);
    };

    const clickOutside = (e) => {
        if (!modalRef.current || modalRef.current.contains(e.target)) return;
        setBetModal(false);
    };

    const updateRadioValue = (e) => {
        setRadioValue(e.target.value);
    };

    useEffect(() => {
        crossRef.current.checked = true;
    }, []);

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
                <form className="bet-modal-form" onSubmit={(e) => submit(e)}>
                    <div className="bet-modal-input-container">
                        <label className="bet-modal-label" for="betAmount">
                            Bet Amount
                        </label>
                        <br />
                        <input
                            className="bet-modal-amount-input"
                            name="betAmount"
                            type="number"
                            placeholder="Your bet"
                            required
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                        />

                        <div className="bet-modal-radio-container">
                            <div className="bet-modal-radio">
                                <label for="betOne">
                                    {match.homeTeam.name} <br />
                                    {match.odds.one}
                                </label>
                                <br />
                                <input
                                    className="bet-modal-radio-input"
                                    name="betTeam"
                                    id="betOne"
                                    type="radio"
                                    value="1"
                                    onChange={(e) => updateRadioValue(e)}
                                />
                            </div>

                            <div className="bet-modal-radio">
                                <label for="betX">
                                    DRAW
                                    <br />
                                    {match.odds.cross}
                                </label>
                                <br />
                                <input
                                    className="bet-modal-radio-input"
                                    name="betTeam"
                                    id="betX"
                                    type="radio"
                                    value="X"
                                    ref={crossRef}
                                    onChange={(e) => updateRadioValue(e)}
                                />
                            </div>

                            <div className="bet-modal-radio">
                                <label for="betTwo">
                                    {match.awayTeam.name}
                                    <br />
                                    {match.odds.two}
                                </label>
                                <br />
                                <input
                                    className="bet-modal-radio-input"
                                    name="betTeam"
                                    id="betTwo"
                                    type="radio"
                                    value="2"
                                    onChange={(e) => updateRadioValue(e)}
                                />
                            </div>
                        </div>
                        {errorMessage !== "" ? (
                            <p className="bet-error-message">{errorMessage}</p>
                        ) : null}
                        <button className="bet-modal-btn">BET!</button>
                        <div className="bet-modal-close-wrapper">
                            <div
                                className="bet-modal-close"
                                onClick={() => exit()}
                            >
                                <img
                                    className="bet-modal-cross"
                                    src={crossMark}
                                    alt="exit"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddBetModal;
