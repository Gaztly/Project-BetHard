import { useState, createContext, useEffect } from "react";
import LocalStorage from "../storage/LocalStorage";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user === null) {
            if (localStorage.getItem(LocalStorage.user)) {
                console.log("Fetched user from storage");
                setUser(JSON.parse(localStorage.getItem(LocalStorage.user)));
            }
        }
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
