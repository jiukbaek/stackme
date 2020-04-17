import React, { useEffect, useState, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../css/myproject.scss";
import {
  getProjectAsync,
  getProjectIdAsync,
  deleteProjectAsync,
} from "../../modules/project";
import { getProjectType, removeHtml } from "../../utils";
import { getAllSkillAsync } from "../../modules/skill";
import Pagination from "../../components/Pagination";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useInput from "../../Hooks/useInput";
import ModalBox from "../../components/ModalBox";
import DeleteProject from "../../components/DeleteProject";

function MyProjectPage({ location, match, history }) {
  const animatedComponents = makeAnimated();
  const { projects, pagination, loading } = useSelector(
    (state) => state.project
  );
  const { skills } = useSelector((state) => state.skill);
  const dispatch = useDispatch();
  const searchInput = useInput("");
  const [filterSkill, setFilterSkill] = useState(null);
  const skillSelector = useRef();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const skillSelectOption =
    skills &&
    skills.map((obj) => ({
      value: obj.id,
      label: obj.skill,
    }));

  useEffect(() => {
    const savedQ = localStorage.getItem("q");
    const savedSkill = localStorage.getItem("filterSkill");

    searchInput.setValue(savedQ ? savedQ : "");
    setFilterSkill(savedSkill ? savedSkill.split(",") : null);

    dispatch(getAllSkillAsync());
    dispatch(getProjectAsync());
  }, []);

  const showProject = async (id) => {
    await dispatch(getProjectIdAsync(id));
    history.push("/project");
  };

  const modifyProject = async (id) => {
    await dispatch(getProjectIdAsync(id));
    history.push("/me/project/modify");
  };

  const deleteInitProject = () => {
    setDeleteTarget(null);
  };

  const deleteProject = async () => {
    await dispatch(deleteProjectAsync(deleteTarget));
    deleteInitProject();
  };

  const deleteProjectConfirm = (id) => {
    setDeleteTarget(id);
  };

  const changePage = async (page) => {
    await dispatch(getProjectAsync(page));
    window.scrollTo(0, 0);
  };

  const setFilter = () => {
    if (filterSkill) localStorage.setItem("filterSkill", filterSkill.join(","));
    else localStorage.removeItem("filterSkill");

    if (searchInput.value) localStorage.setItem("q", searchInput.value);
    else localStorage.removeItem("q");

    dispatch(getProjectAsync());
  };

  return (
    <section className={`myProjectPageWrapper${loading ? " loading" : ""}`}>
      <div className="myProjectWrapper">
        <div className="myProjectTop">
          <div className="myProjectOptionsWrapper">
            <div className="myProjectOptionsWrapperLabel">
              필터 <i className="fa fa-filter"></i>
            </div>
            <div className="myProjectOptionSkill">
              <div className="myProjectOptionLabel">사용 기술</div>
              <div className="myProjectOptionSkillSelect">
                {skills && (
                  <Select
                    options={skillSelectOption}
                    components={animatedComponents}
                    defaultValue={
                      filterSkill &&
                      (() =>
                        filterSkill.map(
                          (value) => skillSelectOption[value - 1]
                        ))()
                    }
                    isMulti
                    ref={skillSelector}
                    onChange={(value) => {
                      setFilterSkill(
                        value.length > 0
                          ? value.map((skill) => skill.value)
                          : null
                      );
                    }}
                  />
                )}
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
              <button onClick={setFilter}>적용</button>
            </div>
          </div>
          <Link to="/me/project/regist" className="myProjectRegist">
            <button>등록</button>
          </Link>
        </div>
        <div className="myProjectListWrapper">
          {projects &&
            projects.map((project) => (
              <div
                className="myProjectItemWrapper"
                key={`myProject${project.id}`}
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
                      deleteProjectConfirm(project.id);
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
      {deleteTarget && (
        <ModalBox>
          <DeleteProject
            deleteProject={deleteProject}
            deleteInitProject={deleteInitProject}
          />
        </ModalBox>
      )}
    </section>
  );
}

export default withRouter(MyProjectPage);
