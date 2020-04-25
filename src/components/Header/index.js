import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../modules/auth";
import { toggleUserContext } from "../../utils";

function Header() {
  const { isLogined, currentUser } = useSelector((state) => state.auth);
  const [toggleMenu, setToggleMenu] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const headerMobile = document.querySelector(".headerMobile");
      if (
        !e.path.includes(headerMobile) ||
        e.target.className === "mobileMenuItem"
      )
        setToggleMenu(false);
    });
  }, []);

  return (
    <header>
      <div className="headerWrapper">
        <div className="headerLeft">
          <Link to="/">
            <img src="/static/image/header_logo.png" />
          </Link>
        </div>
        <div className="headerRight">
          {isLogined ? (
            <div className="headerUserWrapper">
              <div className="headerUserInfo" onClick={toggleUserContext}>
                <span className="userName">{currentUser.user_name} 님</span>
                <i className="fa fa-caret-down"></i>
              </div>
              <div className="userContext">
                <Link to="/projects">모든 프로젝트</Link>
                <Link to="/me">내 정보</Link>
                <Link to="/me/project">내 프로젝트</Link>
                <Link to="/me/api">API</Link>
                <div className="divider"></div>
                <a onClick={() => dispatch(logOut())}>로그아웃</a>
              </div>
            </div>
          ) : (
            <div className="authBox">
              <Link to="/login">로그인 / 회원가입</Link>
            </div>
          )}
        </div>
        <div className="headerMobile">
          <div
            className="mobileMenuButton"
            onClick={() => {
              setToggleMenu((state) => !state);
            }}
          >
            {toggleMenu ? (
              <img src="/static/image/close.png" />
            ) : (
              <img src="/static/image/open-menu.png" />
            )}
          </div>
          {toggleMenu && (
            <div className="mobileMenu">
              <div className="mobileMenuTop">
                {isLogined
                  ? `${currentUser.user_name} 님`
                  : "로그인 후 이용하세요"}
              </div>
              <div className="mobileMenus">
                {isLogined ? (
                  <>
                    <Link to="/projects" className="mobileMenuItem">
                      모든 프로젝트
                    </Link>
                    <Link to="/me" className="mobileMenuItem">
                      내 정보
                    </Link>
                    <Link to="/me/project" className="mobileMenuItem">
                      내 프로젝트
                    </Link>
                    <Link to="/me/api" className="mobileMenuItem">
                      API
                    </Link>
                    <div
                      className="mobileMenuItem"
                      onClick={() => dispatch(logOut())}
                    >
                      로그아웃
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="mobileMenuItem">
                      로그인
                    </Link>
                    <Link to="/signup" className="mobileMenuItem">
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
