import React from "react";

const welcomeTitle = {
  color: "black",
  fontFamily: "helvetica",
  fontSize: 40,
  marginLeft: 70,
};

const welcomeMessage = {
  color: "black",
  fontFamily: "helvetica",
  fontSize: 30,
  marginLeft: 70,
};

const Home = () => {
  return (
    <div>
      <h1 style={welcomeTitle}>Welcome to our amazing platform</h1>
      <br></br>
      <h3 style={welcomeMessage}>If you are a user navigate to login!</h3>
      <br></br>
      <h3 style={welcomeMessage}>
        If you are brand new go to login and<br></br> choose to register a user
      </h3>
    </div>
  );
};

export default Home;
