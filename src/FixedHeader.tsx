import React from "react";
import {Container, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

const FixedHeader = () => (
  <Menu fixed="top">
    <Container className={"app-title"}>
      <a className="header item">
        <Link to={"/"}>
          Feast
        </Link>
      </a>
      <a className="item">
        <Link to={"/create-recipe"}>Create A Recipe</Link>
      </a>
    </Container>
  </Menu>
);

export default FixedHeader;
