import React, {FormEvent, useState} from "react";
import {Redirect} from "react-router-dom";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

export const LoginScene: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onEmailChange = (e: FormEvent<HTMLInputElement>) => { setEmail((e.target as any).value)};
  const onPasswordChange = (e: FormEvent<HTMLInputElement>) => { setPassword((e.target as any).value)};

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    //TODO: left off here, call user backend point to get login token
    12312
  }

  return (
    <section>
      <form action={"/"} onSubmit={onSubmit}>
        <h2>Login</h2>
        <div>
          <InputText
            name={"email"}
            onChange={onEmailChange}
            value={email} />
        </div>
        <div>
          <InputText
            type="password"
            name="password"
            onChange={onPasswordChange}
            value={password}
          />
        </div>

        <div className="button-line">
          <Button type="submit" label="Log in" />
        </div>
      </form>
    </section>
  );
};

export const LoggedoutScene: React.FC = () => (<Redirect to={"/login"} />);
