import React, { useEffect, useState } from "react";
import API from "../../../shared/api/services/findMatches-service";
import { MatchCard } from "./matchcard/MatchCard";
import "./MatchContent.css";
import { Loader } from "../../loader/Loader";
import AddBetModal from "../../addbetmodal/AddBetModal";

export const MatchContent = () => {
    const [matches, setMatches] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [betModal, setBetModal] = useState(false);
    const [modalMatch, setModalMatch] = useState();
    const [isError, setIsError] = useState(false);

    const findMatches = async () => {
        try {
            setIsError(false);
            const response = await API.findRelevantMatches();

            if (response.status !== 200) {
                setIsError(true);
                return;
            }

            setMatches(
                response.data.sort((a, b) => a.utcDate.localeCompare(b.utcDate))
            );
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    const playedMatches = () => {
        return isLoaded ? (
            <>
                {matches?.map((match, index) => {
                    if (match.status === "FINISHED") {
                        return <MatchCard key={index} match={match} />;
                    }
                })}
            </>
        ) : isError ? (
            <h3>Error loading matches</h3>
        ) : (
            <span>
                <Loader />
            </span>
        );
    };
    const comingMatches = () => {
        return isLoaded && !isError ? (
            <>
                {matches?.map((match, index) => {
                    if (match.status !== "FINISHED") {
                        return (
                            <MatchCard
                                key={index}
                                match={match}
                                setModalMatch={setModalMatch}
                                setBetModal={setBetModal}
                            />
                        );
                    }
                })}
            </>
        ) : isError ? (
            <h3>Error loading matches</h3>
        ) : (
            <span>
                <Loader />
            </span>
        );
    };

    //Hämtar en modal om betModal sätts till true
    const getModal = () => {
        return <AddBetModal match={modalMatch} setBetModal={setBetModal} />;
    };

    useEffect(() => {
        findMatches();
    }, []);

    return (
        <main id="match-box-style">
            {betModal && getModal()}

            <div className="matchinfo">
                <h2 id="match-title">Coming Matches</h2>
                <div className="info-box">{comingMatches()}</div>
            </div>
            <div className="matchinfo matchinfo-bottom">
                <h2 id="match-title">Played Matches</h2>
                <div className="info-box">{playedMatches()}</div>
            </div>
        </main>
    );
};
