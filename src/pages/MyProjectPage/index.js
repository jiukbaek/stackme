import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../css/myproject.scss";
import {
  getMyProjectAsync,
  getProjectIdAsync,
  deleteProjectAsync,
} from "../../modules/project";
import { getProjectType, removeHtml } from "../../utils";
import { getAllSkillAsync } from "../../modules/skill";
import Pagination from "../../components/Pagination";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useInput from "../../Hooks/useInput";

function MyProjectPage({ location, match, history }) {
  const animatedComponents = makeAnimated();
  const { projects, pagination, loading } = useSelector(
    (state) => state.project
  );
  const { skills } = useSelector((state) => state.skill);
  const dispatch = useDispatch();
  const searchInput = useInput("");
  const [filterSkill, setFilterSkill] = useState(null);

  const skillSelectOption =
    skills &&
    skills.map((obj) => ({
      value: obj.id,
      label: obj.skill,
    }));

  useEffect(() => {
    dispatch(getAllSkillAsync());
    dispatch(getMyProjectAsync());
  }, []);

  const showProject = async (id) => {
    await dispatch(getProjectIdAsync(id));
    history.push("/project");
  };

  const modifyProject = async (id) => {
    await dispatch(getProjectIdAsync(id));
    history.push("/meprojectmodify");
  };

  const deleteProject = async (id) => {
    await dispatch(deleteProjectAsync(id));
  };

  const changePage = async (page) => {
    await dispatch(getMyProjectAsync(page));
    window.scrollTo(0, 0);
  };

  const setFilter = () => {};

  return (
    <section className={`myProjectPageWrapper${loading ? " loading" : ""}`}>
      <div className="myProjectWrapper">
        <div className="myProjectTop">
          <div className="myProjectOptionsWrapper">
            <div className="myProjectOptionsWrapperLabel">
              필터 <i class="fa fa-filter"></i>
            </div>
            <div className="myProjectOptionSkill">
              <div className="myProjectOptionLabel">사용 기술</div>
              <div className="myProjectOptionSkillSelect">
                <Select
                  options={skillSelectOption}
                  components={animatedComponents}
                  isMulti
                />
              </div>
            </div>
            <div className="myProjectOptionSearch">
              <div className="myProjectOptionLabel">제목 검색</div>
              <div className="myProjectOptionSearchInput">
                <input
                  type="text"
                  value={searchInput.value}
                  onChange={searchInput.onChange}
                />
              </div>
            </div>
            <div className="myProjectOptionSubmit">
              <button>적용</button>
            </div>
          </div>
          <Link to="/meprojectregist">
            <button>등록</button>
          </Link>
        </div>
        <div className="myProjectListWrapper">
          {projects &&
            projects.map((project) => (
              <div
                className="myProjectItemWrapper"
                key={project.id}
                onClick={() => {
                  showProject(project.id);
                }}
              >
                <div className="myProjectItemThumnail">
                  <img src={`/public/thumnail/${project.thumnail}`} />
                </div>
                <div className="myProjectItemContent">
                  <div className="myProjectItemColumn">
                    <div>
                      <div className="myProjectItemContentLabel">
                        프로젝트 타입
                      </div>
                      {getProjectType(project.type)}
                    </div>
                    <div>
                      <div className="myProjectItemContentLabel">공개 여부</div>
                      {project.showing === "Y" ? "공개" : "비공개"}
                    </div>
                  </div>
                  <div className="myProjectItemColumn">
                    <div>
                      <div className="myProjectItemContentLabel">시작 기간</div>
                      {project.start_date}
                    </div>
                    <div>
                      <div className="myProjectItemContentLabel">종료 기간</div>
                      {project.end_date ? project.end_date : "진행 중"}
                    </div>
                  </div>
                  <div>
                    <div className="myProjectItemContentLabel">제목</div>
                    {project.title}
                  </div>
                  <div>{removeHtml(project.content).substr(0, 200)}</div>
                </div>
                <div className="myProjectItemManage">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      modifyProject(project.id);
                    }}
                  >
                    <i className="icon icon-note"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(project.id);
                    }}
                  >
                    <i className="icon icon-trash"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
        {pagination && (
          <Pagination pagination={pagination} onChange={changePage} />
        )}
      </div>
    </section>
  );
}

export default withRouter(MyProjectPage);
