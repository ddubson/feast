import React from "react";
import {Link} from "react-router-dom";
import {useAuth0} from "./browser/auth/AuthFacade";

const FixedHeader = () => {
  const {isAuthenticated, logout, user} = useAuth0();

  if (!user) {
    return <></>;
  }

  return (
    <div className="ui medium menu fixed">
      <div className="ui container">
        <div className="item">
          <Link to="/">Feast</Link>
        </div>
        <div className="right menu">
          {isAuthenticated && (
            <div className="ui dropdown item">
              {user.name} <i className="dropdown icon"></i>
              <div className="menu">
                <a className="item" onClick={() => logout()}>Log out</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixedHeader;
