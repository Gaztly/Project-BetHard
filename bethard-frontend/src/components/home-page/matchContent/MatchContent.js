import React, { useEffect, useState } from "react";
import API from "../../../shared/api/services/findMatches-service";
import { MatchCard } from "./matchcard/MatchCard";
// import Spinner from "react-bootstrap/Spinner";
import "./MatchContent.css";

export const MatchContent = () => {
    const [matches, setMatches] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

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
                {/* <Spinner></Spinner> */}
                <div>Loading....</div>
            </span>
        );
    };
    const comingMatches = () => {
        return isLoaded ? (
            <div className="info-box">
                <h2 id="match-title">Coming Matches</h2>
                {matches?.map((match, index) => {
                    if (match.status != "FINISHED") {
                        return <MatchCard key={index} match={match} />;
                    }
                })}
            </div>
        ) : (
            <span>
                {/* <Spinner></Spinner> */}
                <div>Loading....</div>
            </span>
        );
    };

    useEffect(() => {}, []);

    return (
        <main>
            <h1>Latest mateches</h1>
            <button onClick={() => findMatches()}>Load matches</button>

            <section>{playedMatches()}</section>
            <section>{comingMatches()}</section>
        </main>
    );
};
