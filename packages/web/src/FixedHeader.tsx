import React from "react";
import {Toolbar} from "primereact/toolbar";

const FixedHeader = () => {
  const leftBar = () => <h3>Feast!</h3>
  const rightBar = () => <></>

  return (
    <Toolbar left={leftBar} right={rightBar} />
  );
};

export default FixedHeader;
