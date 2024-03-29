import React, { useContext, useState, useEffect } from "react";
import "./HomeBets.css";
import API from "../../../../shared/api/services/findBets-service";
import { UserContext } from "../../../../shared/provider/UserProvider";
import { Loader } from "../../../loader/Loader";
import { BetCard } from "./BetCard/BetCard";
import RemoveBetModal from "../../../removebetmodal/RemoveBetModal";

function HomeBets() {
    //Hämtar Context med hjälp av UserContext. från Userprovider.js, som en referens.
    const [user, setUser] = useContext(UserContext);
    const [bets, setBets] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [matchData, setMatchData] = useState();
    const [isError, setIsError] = useState(false);

    const [modalMatch, setModalMatch] = useState();
    const [modalBet, setModalBet] = useState();
    const [showModal, setShowModal] = useState(false);

    const AllBets = async () => {
        setIsLoaded(false);
        try {
            //innehåller data, headers body status osv från http callet.
            //responsen innehåller json object
            const response = await API.betsForUser(user);

            //error checking, om responsen inte är 200 så är det en error
            if (response.status !== 200) {
                setUser(null); //Sätter användaren till null om användarens token är ogiltig
                setIsError(true);

                return;
            }

            const data = response.data;
            setBets(
                data.sort((a, b) => b.timePlaced.localeCompare(a.timePlaced))
            );

            const matchIds = data?.map((b) => b.matchId);

            //Visar mer utförligt hur den tar emot response från api, och sparar ner i response.
            //och tar datan från responsen
            if (matchIds.length != 0) {
                const responsetwo = await API.GetMatchById(matchIds);
                setMatchData(responsetwo.data);
            }

            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    const PlacedBets = () => {
        return isLoaded ? (

            <>
                {bets === undefined ? (
                    <div>No bets placed</div>
                ) : (
                    bets.map((bets, index) => {
                        const match = matchData?.filter(
                            (x) => x.id === bets.matchId
                        )[0];
                        return (
                            <>
                                <BetCard
                                    key={index}
                                    bets={bets}
                                    match={match}
                                    setModalBet={setModalBet}
                                    setModalMatch={setModalMatch}
                                    setShowModal={setShowModal}
                                />
                                <hr />
                            </>
                        );
                    })
                )}
            </>

        ) : isError ? (
            <h3>Error loading matches</h3>
        ) : (
            <span>
                <Loader />
            </span>
        );
    };

    useEffect(() => {
        AllBets();
    }, []);

    return (
        <div id="bet-box-style">
            <div className="bets-info-box">
                {showModal && (
                    <RemoveBetModal
                        match={modalMatch}
                        bet={modalBet}
                        setShowModal={setShowModal}
                    />
                )}
                <h2 id="match-title">Placed bets</h2>
                {PlacedBets()}
            </div>
        </div>
    );
}

export default HomeBets;
