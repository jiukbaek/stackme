import React, { useEffect } from "react";
import "../../css/signup.scss";
import useInput from "../../Hooks/useInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authInit, createUserAsync, authFail } from "../../modules/auth";

function SignupPage() {
  const dispatch = useDispatch();
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const nameInput = useInput("");
  const birthInput = useInput("");
  const { error, currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authInit());
  }, []);

  const signupSubmit = () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;
    const birth = birthInput.value;

    if (!email || !password || !name || !birth) {
      dispatch(authFail("입력하지 않은 정보가 있습니다."));
      return false;
    }

    dispatch(createUserAsync({ email, password, name, birth }));
  };

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
          <>
            <div className="signupLabel">이메일</div>
            <input
              type="text"
              value={emailInput.value}
              onChange={emailInput.onChange}
            />
            <div className="signupLabel">비밀번호</div>
            <input
              type="password"
              value={passwordInput.value}
              onChange={passwordInput.onChange}
            />
            <div className="signupLabel">이름</div>
            <input
              type="text"
              value={nameInput.value}
              onChange={nameInput.onChange}
            />
            <div className="signupLabel">생년월일</div>
            <input
              type="text"
              value={birthInput.value}
              onChange={birthInput.onChange}
              placeholder={"ex)1994-02-05"}
            />
            <div className="signupInfoBox">{error}</div>
            <button className="signupBtn" onClick={signupSubmit}>
              가입
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
