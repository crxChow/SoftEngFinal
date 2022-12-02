import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Chris messed up!</h1>
      <p>Sorry, he can't code</p>
      <p>
        <i>His skills are: {error.statusText || error.message}</i>
      </p>
    </div>
  );
}
