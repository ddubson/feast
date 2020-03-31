import React from "react";
import {useAuth0} from "../../browser/auth/AuthFacade";
import {Redirect} from "react-router-dom";

export const LoginScene: React.FC = () => {
  const {loginWithRedirect} = useAuth0();

  return (
    <div className="ui container">
      <div className="ui section">
        <button className="ui primary button" onClick={() => loginWithRedirect({})}>Log in</button>
      </div>
    </div>
  );
};

export const LoggedoutScene: React.FC = () => (<Redirect to={"/login"} />);
