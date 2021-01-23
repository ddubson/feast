import React from "react";
import {Toolbar} from "primereact/toolbar";
import {Link} from "react-router-dom";

type FixedHeaderProps = {
  isUserSignedIn: () => boolean;
}

const FixedHeader = ({ isUserSignedIn }: FixedHeaderProps) => {
  const leftBar = () => <h3>Feast!</h3>
  const rightBar = () => <>{isUserSignedIn() ?
    <>Hooray! ❤</> :
    <><Link to={"/login"}>Log in</Link></>}</>

  return (
    <Toolbar left={leftBar} right={rightBar} />
  );
};

export default FixedHeader;
