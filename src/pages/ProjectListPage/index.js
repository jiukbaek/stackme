import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moreProjectAsync,
  getProjectAsync,
  projectsInit,
} from "../../modules/project";
import ProjectItem from "../../components/ProjectItem";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../../css/project.scss";
import { getAllSkillAsync } from "../../modules/skill";

function ProjectListPage() {
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  const { loading, projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const [page, setPage] = useState(1);
  const [filterSkill, setFilterSkill] = useState(null);

  const skillSelectOption =
    skills &&
    skills.map((obj) => ({
      value: obj.id,
      label: obj.skill,
    }));

  const setFilter = () => {
    if (filterSkill)
      localStorage.setItem("publicFilterSkill", filterSkill.join(","));
    else localStorage.removeItem("publicFilterSkill");

    location.reload();
  };

  useEffect(() => {
    const savedSkill = localStorage.getItem("publicFilterSkill");

    window.addEventListener("scroll", handleScroll);

    setFilterSkill(savedSkill ? savedSkill.split(",") : null);

    dispatch(getAllSkillAsync());
  }, []);

  useEffect(() => {
    dispatch(moreProjectAsync(page, 10, true));
  }, [page]);

  const handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    //스크롤 이벤트 발생 시 한번 만 발생 하게 끔
    if (!loading && scrollHeight - innerHeight - scrollTop < 100) {
      setPage((state) => state + 1);
    }
  };

  return (
    <div className="publicProjectWrapper">
      <div className="publicProjectFilter">
        <div className="publicProjectFilterLabel">
          필터 <i className="fa fa-filter"></i>
        </div>
        <div className="publicProjectFilterSkill">
          <div className="publicProjectFilterOptionLabel">사용기술</div>
          {skills && (
            <Select
              options={skillSelectOption}
              components={animatedComponents}
              isMulti
              defaultValue={
                filterSkill &&
                (() =>
                  filterSkill.map((value) => skillSelectOption[value - 1]))()
              }
              onChange={(value) => {
                setFilterSkill(
                  value.length > 0 ? value.map((skill) => skill.value) : null
                );
              }}
            />
          )}
        </div>
        <div className="publicProjectOptionSubmit">
          <button onClick={setFilter}>적용</button>
        </div>
      </div>
      <div className="publicProjectList">
        {projects &&
          projects.map((project) => (
            <ProjectItem
              key={project.id}
              thumnail={project.thumnail}
              type={project.type}
              title={project.title}
              content={project.content}
            />
          ))}
      </div>
    </div>
  );
}

export default ProjectListPage;
