import React from "react";
import {Container, Menu} from "semantic-ui-react";

const FixedHeader = () => (
  <Menu fixed="top">
    <Container className={"app-title"}>
      <Menu.Item data-test="app-title" as="a" header>
        Feast
      </Menu.Item>
    </Container>
  </Menu>
);

export default FixedHeader;
