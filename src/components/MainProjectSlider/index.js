import React, { useEffect } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { projectRandom } from "../../modules/project";
import ProjectItem from "../ProjectItem";

function MainProjectSlider() {
  useEffect(() => {
    dispatch(projectRandom(5));
  }, []);

  const result = useSelector(state => state.project.projects);
  const dispatch = useDispatch();

  const config = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "projectSlider"
  };

  return (
    <Slider {...config}>
      {result &&
        result.map(project => (
          <ProjectItem
            key={project.id}
            thumnail={project.thumnail}
            type={project.type}
            title={project.title}
            content={project.content}
          />
        ))}
    </Slider>
  );
}

export default MainProjectSlider;
