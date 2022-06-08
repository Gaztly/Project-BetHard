import { useState, createContext, useEffect } from "react";
import LocalStorage from "../storage/LocalStorage";

//UserContext provider
const UserContext = createContext(null);

//Fungerar i princip som en static.
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUserFromStorage = () => {
        // Om ingen user hittas i useState så skapas en user från localstorage.
        // en double check så det inte skriver över någon user.
        if (user === null) {
            //LocalStorage från filen, localStorage från webbläsaren
            if (localStorage.getItem(LocalStorage.user)) {
                setUser(JSON.parse(localStorage.getItem(LocalStorage.user)));
            }
        }
    };

    //vid varje rendering. Körs bara en gång
    useEffect(() => {
        getUserFromStorage();
    }, []);

    return (
        //usercontext.(provider) används för att skicka createContext till andra komponenter (children).
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
