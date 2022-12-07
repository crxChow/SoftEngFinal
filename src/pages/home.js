import React from "react";

const welcomeTitle = {
  color: "black",
  fontFamily: "helvetica",
  fontSize: 40,
  padding: 30,
};

const welcomeMessage = {
  color: "black",
  fontFamily: "helvetica",
  fontSize: 30,
  padding: 30,
};

const Home = () => {
  return (
    <div>
      <h1 style={welcomeTitle}>Welcome to our amazing platform</h1>
      <h3 style={welcomeMessage}>If you are a user navigate to login!</h3>
      <h3 style={welcomeMessage}>
        If you are brand new go to login and<br></br> choose to register a user
      </h3>
    </div>
  );
};

export default Home;
