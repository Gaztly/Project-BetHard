import React from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import UserContext from "./context/userContext";
import Routes from "./Routes/Routing";
import { useContext } from "react";

function App() {
  return (
    <>
      <UserContext.Provider value={""}>
        <Routes Header={<Header />} Footer={<Footer />} />
      </UserContext.Provider>
    </>
  );
}

export default App;
