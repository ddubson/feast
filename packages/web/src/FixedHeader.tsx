import React, {ReactElement} from "react";
import {Toolbar} from "primereact/toolbar";

const FixedHeader = () => {
  const leftBar = () => <h1>Feast!</h1>
  const rightBar = () => <></>

  return (
    <Toolbar left={leftBar} right={rightBar} />
  );
};

export default FixedHeader;
