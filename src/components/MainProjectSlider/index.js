import React, { useEffect } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { projectRandom, getProjectIdAsync } from "../../modules/project";
import ProjectItem from "../ProjectItem";
import { withRouter } from "react-router-dom";

function MainProjectSlider({ history }) {
  useEffect(() => {
    dispatch(projectRandom(5));
  }, []);

  const result = useSelector((state) => state.project.projects);
  const dispatch = useDispatch();

  const config = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "projectSlider",
  };

  const showProject = async (id) => {
    await dispatch(getProjectIdAsync(id));
    history.push("/project");
  };

  return (
    <Slider {...config}>
      {result &&
        result.map((project) => (
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
  );
}

export default withRouter(MainProjectSlider);
