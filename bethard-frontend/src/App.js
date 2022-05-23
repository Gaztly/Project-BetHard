import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/views/Home";
import Login from "./components/views/Login";
import NotFound from "./components/views/NotFound";
import Register from "./components/views/Register";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import UserContext from "./context/userContext";

function App() {
    return (
        <>
            <UserContext.Provider value={""}>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
                <Footer />
            </UserContext.Provider>
        </>
    );
}

export default App;
