import React, { useContext } from "react";
import { UserContext } from "../../shared/provider/UserProvider";
import HomeLoggedInView from "../homeLoggedInView/HomeLoggedInView";
import HomeGuestView from "../homeGuestView/HomeGuestView";

function Home() {
    const [user, setUser] = useContext(UserContext);

    // setUser({ dummy: "yes" });
    return <>{user !== null ? <HomeLoggedInView /> : <HomeGuestView />}</>;
}

export default Home;
