import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../Hooks/useInput";
import {
  authFail,
  verifySignupAsync,
  checkEmailCodeAsync,
  createUserAsync,
} from "../../modules/auth";
import { KeyPressEnter } from "../../utils";

function SignupBox() {
  const dispatch = useDispatch();
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const nameInput = useInput("");
  const birthInput = useInput("");
  const codeInput = useInput("");
  const { error, currentUser, verify } = useSelector((state) => state.auth);

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

  const verifySignup = () => {
    const email = emailInput.value;

    if (!email) {
      return false;
    }

    dispatch(verifySignupAsync(email));
  };

  const checkEmailCode = () => {
    const email = emailInput.value;
    const code = codeInput.value;

    if (!email || !code) {
      return false;
    }

    dispatch(checkEmailCodeAsync(email, code));
  };

  return (
    <>
      {verify === 3 ? (
        <>
          <div className="signupLabel">이메일</div>
          <input
            type="text"
            value={emailInput.value}
            onChange={emailInput.onChange}
            onKeyPress={(e) => {
              if (KeyPressEnter(e.key)) signupSubmit();
            }}
          />
          <div className="signupLabel">비밀번호</div>
          <input
            type="password"
            value={passwordInput.value}
            onChange={passwordInput.onChange}
            onKeyPress={(e) => {
              if (KeyPressEnter(e.key)) signupSubmit();
            }}
          />
          <div className="signupLabel">이름</div>
          <input
            type="text"
            value={nameInput.value}
            onChange={nameInput.onChange}
            onKeyPress={(e) => {
              if (KeyPressEnter(e.key)) signupSubmit();
            }}
          />
          <div className="signupLabel">생년월일</div>
          <input
            type="text"
            value={birthInput.value}
            onChange={birthInput.onChange}
            placeholder={"ex)1994-02-05"}
            onKeyPress={(e) => {
              if (KeyPressEnter(e.key)) signupSubmit();
            }}
          />
          <div className="signupInfoBox">{error}</div>
          <button className="signupBtn" onClick={signupSubmit}>
            가입
          </button>
        </>
      ) : (
        <>
          <div className="signupLabel">이메일</div>
          <input
            type="text"
            value={emailInput.value}
            onChange={emailInput.onChange}
            onKeyPress={(e) => {
              if (KeyPressEnter(e.key))
                verify === 1 ? verifySignup() : checkEmailCode();
            }}
          />
          {verify === 2 && (
            <>
              <div className="signupLabel">인증 코드</div>
              <input
                type="text"
                value={codeInput.value}
                onChange={codeInput.onChange}
                onKeyPress={(e) => {
                  if (KeyPressEnter(e.key)) checkEmailCode();
                }}
              />
              {!error && (
                <div className="verifyLabel">코드가 메일로 전송되었습니다.</div>
              )}
            </>
          )}
          <div className="signupInfoBox">{error}</div>
          <button
            className="signupBtn"
            onClick={verify === 1 ? verifySignup : checkEmailCode}
          >
            {verify === 1 ? "가입 확인" : "인증"}
          </button>
        </>
      )}
    </>
  );
}

export default SignupBox;
