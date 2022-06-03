import React, { useEffect, useRef, useState } from "react";
import "./AddBetModal.css";
import crossMark from "../../shared/img/icons/cross-mark.svg";

function AddBetModal({ match, setBetModal }) {
    const [team, setTeam] = useState("");
    const modalRef = useRef();
    const crossRef = useRef();

    const submit = (e) => {
        e.preventDefault();
    };

    const exit = () => {
        setBetModal(false);
    };

    const clickOutside = (e) => {
        if (!modalRef.current || modalRef.current.contains(e.target)) return;
        setBetModal(false);
    };

    useEffect(() => {
        crossRef.current.checked = true;
    }, []);

    return (
        <div className="bet-modal-wrapper" onClick={(e) => clickOutside(e)}>
            <div ref={modalRef} className="bet-modal">
                BET, HARD
                <form className="bet-modal-form" onSubmit={(e) => submit(e)}>
                    <div className="bet-modal-input-container">
                        <label className="bet-modal-label" for="betAmount">
                            Bet Amount
                        </label>
                        <br />
                        <input
                            className="bet-modal-amount-input"
                            name="betAmount"
                            type="text"
                            placeholder="Your bet"
                        />

                        <div className="bet-modal-radio-container">
                            <div className="bet-modal-radio">
                                <label for="betOne">
                                    {match.homeTeam.name} <br />
                                    {match.odds.one}
                                </label>
                                <br />
                                <input
                                    name="betTeam"
                                    id="betOne"
                                    type="radio"
                                    value="1"
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
                                    name="betTeam"
                                    id="betX"
                                    type="radio"
                                    value="X"
                                    ref={crossRef}
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
                                    name="betTeam"
                                    id="betTwo"
                                    type="radio"
                                    value="2"
                                />
                            </div>
                        </div>
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
