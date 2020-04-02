import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../modules/auth";
import { toggleUserContext } from "../../utils";

function Header() {
  const { isLogined, currentUser } = useSelector(state => state.auth);
  const contextMenu = useRef(null);
  const dispatch = useDispatch();

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
              <div className="userContext" ref={contextMenu}>
                <Link to="/me">내 정보</Link>
                <Link to="/meproject">프로젝트 관리</Link>
                <div className="divider"></div>
                <a onClick={() => dispatch(logOut())}>로그아웃</a>
              </div>
            </div>
          ) : (
            <div className="authBox">
              <Link to="/login">로그인</Link>
              <a>회원가입</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
