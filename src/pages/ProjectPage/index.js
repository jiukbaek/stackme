import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/project.scss";
import { getProjectType } from "../../utils";
import { getAllSkillAsync } from "../../modules/skill";
import { getProjectIdAsync } from "../../modules/project";

const Project = () => {
  const skills = useSelector((state) => state.skill.skills);
  const project = useSelector((state) => state.project.project);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!skills) {
      dispatch(getAllSkillAsync());
    }
    if (!project) {
      dispatch(getProjectIdAsync(localStorage.getItem("cpId")));
    }
  }, []);

  return (
    <>
      {project && (
        <div className="projectDetailWrapper">
          <div className="projectDetailTop">
            <div className="projectDetailType">
              {getProjectType(project.type)}
            </div>
            <div className="projectDetailTitle">{project.title}</div>
            <div className="projectDetailDivider"></div>
            <div className="projectDetailInfo">
              <div>{project.User.name}</div>
              <div>
                {project.start_date} ~{" "}
                {project.end_date ? project.end_date : "진행 중"}
              </div>
            </div>
          </div>
          <div
            className="projectDetailContent"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
          <div className="projectDetailDivider"></div>
          <div className="projectDetailSkills">
            <div className="projectDetailLabel">사용 기술</div>
            {skills && (
              <div className="projectDetailSkillsContent">
                {project.skills.split(",").map((skill) => (
                  <div key={skill}>{skills[parseInt(skill) - 1].skill}</div>
                ))}
              </div>
            )}
          </div>
          <div className="projectDetailUrl">
            <div className="projectDetailLabel">참고 URL</div>
            <div className="projectDetailUrlContent">
              {project.url ? (
                <a href={project.url} target="_blank">
                  {project.url}
                </a>
              ) : (
                "❌ 링크가 없어요"
              )}
            </div>
          </div>
          <div className="projectDetailUrl">
            <div className="projectDetailLabel">깃 허브</div>
            <div className="projectDetailUrlContent">
              <span className="projectDetailEmptyText">
                {project.git_url ? project.git_url : "❌ 깃허브가 없어요"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
