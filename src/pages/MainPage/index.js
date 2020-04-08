import React from "react";
import "../../css/main.scss";
import MainInfoItem from "../../components/MainInfoItem";
import MainProjectSlider from "../../components/MainProjectSlider";

const Main = () => {
  return (
    <section className="mainPageWrapper">
      <div className="mainBannerWrapper">
        <div className="mainBannerInner">
          <div className="mainBannerBigText">나를 쌓는 순간</div>
          <div className="mainBannerSmallText">
            서두르지 말아요, 느려도 좋아요.
            <br />
            차곡차곡 나를 쌓아가봐요.
          </div>
          <img
            src="/static/image/banner_block1.png"
            className="mainBannerBlock1"
          />
          <img
            src="/static/image/banner_block2.png"
            className="mainBannerBlock2"
          />
          <img
            src="/static/image/banner_block3.png"
            className="mainBannerBlock3"
          />
        </div>
      </div>
      <div className="mainInfoWrapper">
        <div className="mainSectionTitle">Stack Me</div>
        <div className="mainInfoInner">
          <MainInfoItem
            imgSrc={"career"}
            bigText={"자기 관리"}
            smallText1={"경력, 프로젝트를 관리하여"}
            smallText2={"나를 쌓아보세요."}
          />
          <MainInfoItem
            imgSrc={"project"}
            bigText={"프로젝트 공유"}
            smallText1={"자랑하고 싶은 프로젝트를"}
            smallText2={"모두에게 보여주세요."}
          />
          <MainInfoItem
            imgSrc={"api"}
            bigText={"오픈 API"}
            smallText1={"쌓아올린 나를"}
            smallText2={"오픈 API로 활용해보세요."}
          />
        </div>
      </div>
      <div className="mainProjectWrapper">
        <div className="mainSectionTitle">Project</div>
        <div className="mainProjectInner">
          <MainProjectSlider />
        </div>
      </div>
    </section>
  );
};

export default Main;
