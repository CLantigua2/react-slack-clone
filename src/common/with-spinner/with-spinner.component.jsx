import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const WithSpinner = () => {
  return (
    <Dimmer active>
      <Loader size="huge" content={"Preparing Chat..."} />
    </Dimmer>
  );
};

export default WithSpinner;
