import React from "react";

function MainInfoItem({ imgSrc, bigText, smallText1, smallText2 }) {
  return (
    <div className="mainInfoItem">
      <img src={`/static/image/${imgSrc}_icon.png`} />
      <div className="mainInfoBigText">{bigText}</div>
      <div className="mainInfoSmallText">
        {smallText1}
        <br />
        {smallText2}
      </div>
    </div>
  );
}

export default MainInfoItem;
