import React from "react";
import "./HomeBlurb.css";
import { Loader } from "../../../shared/loader/Loader";
function HomeBlurb() {
  return (
    <div id="home-blurb-container">
      <h1 id="home-blurb-text">The hardest betting you'll ever find.</h1>
      <Loader />
    </div>
  );
}

export default HomeBlurb;
