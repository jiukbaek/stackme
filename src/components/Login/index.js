import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync, loginEmptyParam } from "../../modules/auth";

function Login() {
  const emailInput = useInput();
  const passwordInput = useInput();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);

  const loginOnClick = () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      dispatch(loginEmptyParam());
      return;
    }

    dispatch(loginAsync(email, password));
  };

  return (
    <div className="loginBox">
      <div>로그인</div>
      <div className="loginLabel">email</div>
      <input
        type="text"
        value={emailInput.value}
        onChange={emailInput.onChange}
      />
      <div className="loginLabel">password</div>
      <input
        type="password"
        value={passwordInput.value}
        onChange={passwordInput.onChange}
      />
      <button className="loginBtn" onClick={loginOnClick}>
        로그인
      </button>
      <div className="loginInfoBox">{error}</div>
    </div>
  );
}

export default Login;
