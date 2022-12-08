const moveSide = {
  marginLeft: 70,
};

export default function ErrorPage() {
  //const error = useRouteError();
  //console.error(error);

  return (
    <div id="error-page">
      <img
        style={moveSide}
        src="https://preview.redd.it/nguk2vf6bka51.jpg?auto=webp&s=fed29cf53b6924d9582b3ff719279e535844f068"
      ></img>
      <h1 style={moveSide}>OPPS!</h1>
      <p style={moveSide}>Sorry, an unexpected error has occurred.</p>
      <p style={moveSide}>
        <i>To get back somewhere you belong hit the back arrow</i>
      </p>
    </div>
  );
}
