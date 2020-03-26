import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footerWrapper">
        <img src="/static/image/footer_logo.png" />
        <div className="footerLogoText">Stack Me</div>
        <div className="footerText">
          백지욱 (Baek Ji Uk) | jiuk205@naver.com
        </div>
        <div className="footerText">
          <i className="fa fa-github"></i> github.com/jiukbaek
        </div>
        <div className="footerText">
          Copyright 2020. 백지욱. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
