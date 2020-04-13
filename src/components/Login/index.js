import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../../Hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync, loginEmptyParam } from "../../modules/auth";

function Login() {
  const emailInput = useInput();
  const passwordInput = useInput();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

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
      <div className="loginTop">
        <img src="/static/image/logo.png" />
        <div>로그인</div>
      </div>
      <div className="loginLabel">Email</div>
      <input
        type="text"
        value={emailInput.value}
        onChange={emailInput.onChange}
      />
      <div className="loginLabel">Password</div>
      <input
        type="password"
        value={passwordInput.value}
        onChange={passwordInput.onChange}
      />
      <div className="loginInfoBox">{error}</div>
      <button className="loginBtn" onClick={loginOnClick}>
        로그인
      </button>
      <div className="loginSignup">
        <Link to="/signup">sign up</Link>
      </div>
    </div>
  );
}

export default Login;
