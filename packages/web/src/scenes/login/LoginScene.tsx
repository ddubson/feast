import React from "react";
import {Redirect} from "react-router-dom";

export const LoginScene: React.FC = () => {
  // const {loginWithRedirect} = useAuth0();

  return (
    <div className="ui container segment mtxxl">
      <div className="row">
        <h1 className="ui header center aligned blue">Feast</h1>
        <h3 className="ui header center aligned">A place for recipes.</h3>
      </div>
      <div className="row center-text mtxl">
        <button className="ui primary center floated button">Log in</button>
      </div>
    </div>
  );
};

export const LoggedoutScene: React.FC = () => (<Redirect to={"/login"} />);
