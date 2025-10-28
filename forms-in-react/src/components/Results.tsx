import React from "react";
import type { Inputs } from "../types/Inputs";

type ResultsProps = {
  data: Inputs;
};

const Results: React.FC<ResultsProps> = ({ data }) => {
  return (
    <div style={{ marginTop: 24 }}>
      <h2>Registration Details</h2>
      <div>User Name: {data.name}, User email: {data.email}, Password: {data.password}</div>
    </div>
  );
};

export default Results;
