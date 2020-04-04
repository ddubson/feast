import React from "react";
import {Container, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useAuth0} from "./browser/auth/AuthFacade";

const FixedHeader = () => {
  const {isAuthenticated, logout, user} = useAuth0();

  if (!user) {
    return <></>;
  }

  return (
    <Menu fixed="top">
      <Container className={"app-title"}>
        <Link to={"/"} className="header item">
          Feast
        </Link>
        {isAuthenticated && (
          <>
            <a className="header item">{user.name}</a>
            <a className="header item" onClick={() => logout()}>Log out</a>
          </>
        )}
      </Container>
    </Menu>
  );
};

export default FixedHeader;
