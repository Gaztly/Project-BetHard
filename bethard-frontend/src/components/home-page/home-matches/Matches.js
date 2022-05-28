import React, { useEffect, useState } from "react";
import getMatchesPl from "../../../shared/api/services/footballServices/getMatchesPl";

function Matches() {
    const [match, setMatch] = useState(null);

    const getMatches = () => {
        // Funktion som hämtar matcherna från getMatchesPl och assignar dem till match med setMatch
        const response = getMatchesPl(); // Efter hämtningen kan man lägga till felmeddelanden och sånt (t.ex. visa ett felmeddelande om responsen inte har koden 200)

        setMatch(response.data);
        console.log(match);
    };

    useEffect(() => {
        // useEffect kommer köra funktionen för att hämta matcher om matcher inte redan hämtats, och endast när komponenten Matches laddats in
        if (match === null) getMatches();
    }, []);

    return <div></div>;
}

export default Matches;
