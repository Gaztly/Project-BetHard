import React, { useContext, useEffect } from "react";
import { UserContext } from "../../shared/provider/UserProvider";
import HomeLoggedInView from "../homeLoggedInView/HomeLoggedInView";
import HomeGuestView from "../homeGuestView/HomeGuestView";
import validateUser from "../../shared/api/services/validate-service";
import LocalStorage from "../../shared/storage/LocalStorage";

function Home() {
    const [user, setUser] = useContext(UserContext);

    //Check if login is still valid
    const validateLogin = () => {
        var response = validateUser(user);
        if (response.data !== 200) {
            setUser(null);
            localStorage.removeItem(LocalStorage.user);
        }
    };

    useEffect(() => {
        if (user !== null) validateLogin();
    }, []);

    // setUser({ dummy: "yes" });
    return <>{user !== null ? <HomeLoggedInView /> : <HomeGuestView />}</>;
}

export default Home;
