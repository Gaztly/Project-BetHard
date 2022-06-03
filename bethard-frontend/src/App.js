import React from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { UserProvider } from "./shared/provider/UserProvider";
import Routes from "./Routes/Routing";
import "../src/shared/global/globalstyles.css";
import { MatchesProvider } from "./shared/provider/MatchesProvider";

function App() {
    return (
        <>
            <UserProvider>
                <MatchesProvider>
                    <Routes Header={<Header />} Footer={<Footer />} />
                </MatchesProvider>
            </UserProvider>
        </>
    );
}

export default App;
