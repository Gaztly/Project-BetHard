import React, { useEffect, useState } from "react";
import API from "../../../shared/api/services/findMatches-service";
import { MatchCard } from "./matchcard/MatchCard";
import "./MatchContent.css";
import { Loader } from "../../../shared/loader/Loader";
import AddBetModal from "../../addbetmodal/AddBetModal";

export const MatchContent = () => {
    const [matches, setMatches] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [betModal, setBetModal] = useState(false);
    const [modalMatch, setModalMatch] = useState();

    const findMatches = async () => {
        try {
            const { data } = await API.findRelevantMatches();
            setMatches(data);
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    const findMatchId = async () => {
        try {
            const { data } = await API.findMatchById(2);
            setMatches(data);
        } catch (error) {
            console.log(error);
        }
    };

    const playedMatches = () => {
        return isLoaded ? (
            <div className="info-box">
                <h2 id="match-title">Played Matches</h2>
                {matches?.map((match, index) => {
                    if (match.status === "FINISHED") {
                        return <MatchCard key={index} match={match} />;
                    }
                })}
            </div>
        ) : (
            <span>
                <Loader />
            </span>
        );
    };
    const comingMatches = () => {
        return isLoaded ? (
            <div className="info-box">
                <h2 id="match-title">Coming Matches</h2>
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
            </div>
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
            <section className="matchinfo">{comingMatches()}</section>
            <section className="matchinfo matchinfo-bottom">
                {playedMatches()}
            </section>
        </main>
    );
};
