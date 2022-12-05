import React from "react";
import Model from "../model/model";

export default function Designer({ model }) {
  console.log(model.designer.email);
  return (
    <div>
      <h1>Welcome {model.designer.email}</h1>
    </div>
  );
}
