import React, { useContext, useEffect } from "react";
import { UserContext } from "../../shared/provider/UserProvider";
import HomeLoggedInView from "../homeLoggedInView/HomeLoggedInView";
import HomeGuestView from "../homeGuestView/HomeGuestView";
import validateUser from "../../shared/api/services/validate-service";
import LocalStorage from "../../shared/storage/LocalStorage";

function Home() {
    const [user, setUser] = useContext(UserContext);

    //Check if login is still valid
    const validateLogin = async () => {
        if (user === null) return;
        var response = await validateUser(user);
        console.log(response);
        if (response.status === 204) return; //No content betyder att UserProvider inte hunnit ladda än
        if (response.status !== 200) {
            setUser(null);
            localStorage.removeItem(LocalStorage.user);
        }
    };

    useEffect(() => {
        validateLogin();
    }, []);

    return <>{user !== null ? <HomeLoggedInView /> : <HomeGuestView />}</>;
}

export default Home;
