import React, { useEffect } from "react";
import "../../css/signup.scss";
import useInput from "../../Hooks/useInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authInit, createUserAsync, authFail } from "../../modules/auth";
import SignupBox from "../../components/SignupBox";

function SignupPage() {
  const dispatch = useDispatch();
  const { error, currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authInit());
  }, []);

  return (
    <div className="signupWrapper">
      <div className="signupBox">
        <div className="signupTop">
          <img src="/static/image/logo.png" />
          <div>{currentUser ? "가입완료" : "회원가입"}</div>
        </div>
        {currentUser ? (
          <>
            <div className="signedLabel">환영합니다!</div>
            <Link to="/login" className="signedLogin">
              로그인
            </Link>
          </>
        ) : (
          <SignupBox />
        )}
      </div>
    </div>
  );
}

export default SignupPage;
