import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  //const error = useRouteError();
  //console.error(error);

  return (
    <div id="error-page">
      <h1>OPPS!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>To get back somewhere you belong hit the back arrow</i>
      </p>
    </div>
  );
}
