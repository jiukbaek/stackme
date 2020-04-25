import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { projectRandom, getProjectIdAsync } from "../../modules/project";
import ProjectItem from "../ProjectItem";
import { withRouter } from "react-router-dom";

function MainProjectSlider({ history }) {
  const result = useSelector((state) => state.project.projects);
  const dispatch = useDispatch();
  const [device, setDevice] = useState(null);

  const catchResize = () => {
    if (window.innerWidth > 768) setDevice("pc");
    else setDevice("mobile");
  };

  const showProject = async (id) => {
    await dispatch(getProjectIdAsync(id));

    history.push("/project");
  };

  useEffect(() => {
    dispatch(projectRandom(5));

    window.addEventListener("resize", catchResize);

    if (window.innerWidth > 768) setDevice("pc");
    else setDevice("mobile");
  }, []);

  const config = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 100,
    slidesToShow: device === "pc" ? (result.length < 3 ? result.length : 3) : 1,
    slidesToScroll: 1,
    className: "projectSlider",
  };

  return result && result.length > 0 ? (
    <>
      {device && (
        <Slider {...config}>
          {result.map((project) => (
            <ProjectItem
              key={project.id}
              thumnail={project.thumnail}
              type={project.type}
              title={project.title}
              content={project.content}
              onClick={() => {
                showProject(project.id);
              }}
            />
          ))}
        </Slider>
      )}
    </>
  ) : (
    <div className="mainProjectEmpty">
      <div className="projectEmptyImg">
        <img src="/static/image/sadbee.jpg" />
      </div>
      <div className="projectEmptyText">게시된 프로젝트가 없습니다.</div>
    </div>
  );
}
export default withRouter(MainProjectSlider);
