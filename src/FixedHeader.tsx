import React from "react";
import {Container, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useAuth0} from "./browser/auth/AuthFacade";

const FixedHeader = () => {
  const {isAuthenticated, logout} = useAuth0();

  return (
    <Menu fixed="top">
      <Container className={"app-title"}>
        <a className="header item">
          <Link to={"/"}>
            Feast
          </Link>
        </a>
        {isAuthenticated && (
          <a className="item" onClick={() => logout()}>Log out</a>
        )}
      </Container>
    </Menu>
  );
};

export default FixedHeader;
