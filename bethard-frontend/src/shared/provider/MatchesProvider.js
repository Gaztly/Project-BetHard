import { useState, createContext, useContext } from "react";

const MatchesContext = createContext(null);

const MatchesProvider = ({ children }) => {
    const [matches, setMatches] = useState(null);

    return (
        <MatchesContext.Provider value={[matches, setMatches]}>
            {children}
        </MatchesContext.Provider>
    );
};

//Lägg till matches i state array. Sorterar även efter datum
const AddMatches = (matchesToAdd) => {
    const [matches, setMatches] = useContext(MatchesContext);
    matches
        ? setMatches(
              [...matches, ...matchesToAdd].sort((a, b) =>
                  a.utcDate > b.utcDate ? 1 : b.utcDate > a.utcDate ? -1 : 0
              )
          )
        : setMatches(
              [...matchesToAdd].sort((a, b) =>
                  a.utcDate > b.utcDate ? 1 : b.utcDate > a.utcDate ? -1 : 0
              )
          );
};

export { MatchesContext, MatchesProvider, AddMatches };
