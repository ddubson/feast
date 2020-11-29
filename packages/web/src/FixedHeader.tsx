import React from "react";
import {Link} from "react-router-dom";

const FixedHeader = () => {
  // const {isAuthenticated, logout, user} = useAuth0();

  // if (!user) {
  //   return <></>;
  // }

  return (
    <div className="p-menubar">
      <div className="ui container">
        <div className="item">
          <Link to="/">Feast</Link>
        </div>
        <div className="right menu">
          <div className="ui dropdown item">
            Some User <i className="dropdown icon"></i>
            <div className="menu">
              <a className="item">Log out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedHeader;
