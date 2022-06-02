import { useState, createContext, useEffect } from "react";
import LocalStorage from "../storage/LocalStorage";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUserFromStorage = () => {
        if (user === null) {
            if (localStorage.getItem(LocalStorage.user)) {
                setUser(JSON.parse(localStorage.getItem(LocalStorage.user)));
            }
        }
    };

    useEffect(() => {
        getUserFromStorage();
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
