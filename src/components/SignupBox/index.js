import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../Hooks/useInput";
import {
  authFail,
  verifySignupAsync,
  checkEmailCodeAsync,
  createUserAsync,
} from "../../modules/auth";
import { keyPressEnter, regexData } from "../../utils";

function SignupBox() {
  const dispatch = useDispatch();
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const nameInput = useInput("");
  const birthInput = useInput("");
  const codeInput = useInput("");
  const { error, verify } = useSelector((state) => state.auth);

  const dispatchError = (str) => {
    dispatch(authFail(str));
  };

  const signupSubmit = () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;
    const birth = birthInput.value;

    if (!email || !password || !name || !birth) {
      dispatchError("입력하지 않은 정보가 있습니다.");
      return false;
    }

    if (!regexData("email", email)) {
      dispatchError("이메일 형식이 올바르지 않습니다.");
      return false;
    }

    if (!regexData("date", birth)) {
      dispatchError("생년월일 형식이 올바르지 않습니다.");
      return false;
    }

    dispatch(createUserAsync({ email, password, name, birth }));
  };

  const verifySignup = () => {
    const email = emailInput.value;

    if (!email) {
      dispatchError("이메일을 입력해주세요.");
      return false;
    }

    if (!regexData("email", email)) {
      dispatchError("이메일 형식이 올바르지 않습니다.");
      return false;
    }

    dispatch(verifySignupAsync(email));
  };

  const checkEmailCode = () => {
    const email = emailInput.value;
    const code = codeInput.value;

    if (!email || !code) {
      dispatchError("인증 코드를 입력해주세요.");
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
            type="email"
            value={emailInput.value}
            onChange={emailInput.onChange}
            onKeyPress={(e) => {
              if (keyPressEnter(e.key)) signupSubmit();
            }}
          />
          <div className="signupLabel">비밀번호</div>
          <input
            type="password"
            value={passwordInput.value}
            onChange={passwordInput.onChange}
            onKeyPress={(e) => {
              if (keyPressEnter(e.key)) signupSubmit();
              if (regexData("space", e.key)) e.preventDefault();
            }}
          />
          <div className="signupLabel">이름</div>
          <input
            type="text"
            value={nameInput.value}
            onChange={nameInput.onChange}
            onKeyPress={(e) => {
              if (keyPressEnter(e.key)) signupSubmit();
            }}
          />
          <div className="signupLabel">생년월일</div>
          <input
            type="text"
            value={birthInput.value}
            onChange={(e) => {
              birthInput.setValue(e.target.value);
            }}
            placeholder={"ex)1994-02-05"}
            onKeyPress={(e) => {
              const target = e.target.value;
              if (keyPressEnter(e.key)) signupSubmit();
              if (!/\d/.test(e.key) || target.length >= 10) e.preventDefault();
              if (target.length === 4 || target.length === 7)
                birthInput.setValue(e.target.value + "-");
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
            type="email"
            value={emailInput.value}
            onChange={emailInput.onChange}
            onKeyPress={(e) => {
              if (keyPressEnter(e.key))
                verify === 1 ? verifySignup() : checkEmailCode();
            }}
            readOnly={verify === 2 ? true : false}
          />
          {verify === 2 && (
            <>
              <div className="signupLabel">인증 코드</div>
              <input
                type="text"
                value={codeInput.value}
                onChange={codeInput.onChange}
                onKeyPress={(e) => {
                  if (keyPressEnter(e.key)) checkEmailCode();
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
