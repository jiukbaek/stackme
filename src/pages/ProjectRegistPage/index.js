import React, { useState, useRef, useEffect } from "react";
import "../../css/myproject.scss";
import CKEditor from "ckeditor4-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getProjectType, makeDate, checkDateRange } from "../../utils";
import useInput from "../../Hooks/useInput";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "../../css/react-datepicker.css";
import { projectRegistAsync } from "../../modules/project";
import { getAllSkillAsync } from "../../modules/skill";
import { withRouter } from "react-router-dom";

CKEditor.editorUrl = "/static/config/ckeditor/ckeditor.js";

function ProjectRegistPage({ location, match, history }) {
  const animatedComponents = makeAnimated();

  const skill = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const editor = useRef();

  const titleInput = useInput("");
  const urlInput = useInput("");
  const gitInput = useInput("");

  const [type, setType] = useState(1);
  const [showing, setShowing] = useState("N");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [useSkill, setUseSkill] = useState(null);
  const [error, setError] = useState("");

  const typeSelectOption = [
    { value: 1, label: getProjectType(1) },
    { value: 2, label: getProjectType(2) },
    { value: 3, label: getProjectType(3) },
  ];

  const showingSelectOption = [
    { value: "N", label: "비공개" },
    { value: "Y", label: "공개" },
  ];

  const skillSelectOption =
    skill.skills &&
    skill.skills.map((obj) => ({
      value: obj.id,
      label: obj.skill,
    }));

  const alertError = (error) => {
    setError(error);
    const errorBox = document.querySelector(".editErrorBox");
    errorBox.style.opacity = "1";
    setTimeout(() => {
      errorBox.style.opacity = "0";
    }, 2000);
  };

  useEffect(() => {
    dispatch(getAllSkillAsync());
  }, []);

  const submitProject = () => {
    const content = editor.current.editor.getData();
    const title = titleInput.value;
    const url = urlInput.value;
    const giturl = gitInput.value;

    if (!title || !content) {
      alertError("제목, 본문을 작성해주세요.");
      return false;
    }

    if (!startDate) {
      alertError("시작날짜는 필수항목입니다.");
      return false;
    }

    if (!useSkill) {
      alertError("사용기술은 필수항목입니다.");
      return false;
    }

    if (endDate && !checkDateRange(startDate, endDate)) {
      alertError("날짜범위가 올바르지 않습니다.");
      return false;
    }

    dispatch(
      projectRegistAsync({
        content,
        title,
        type,
        showing,
        start_date: makeDate(startDate),
        end_date: endDate ? makeDate(endDate) : endDate,
        url,
        git_url: giturl,
        skills: useSkill.join(","),
      })
    );
  };

  return (
    <section className="projectRegistPageWrapper">
      <div className="projectRegistWrapper">
        <div className="toggleShowingWrapper">
          <div className="registLabel">공개 설정</div>
          <Select
            options={showingSelectOption}
            defaultValue={showingSelectOption[0]}
            className="registSelector"
            onChange={(e) => {
              setShowing(e.value);
            }}
          />
        </div>
        <div className="typeSelectorWrapper">
          <div className="registLabel">프로젝트 타입</div>
          <Select
            options={typeSelectOption}
            defaultValue={typeSelectOption[0]}
            className="registSelector"
            onChange={(e) => {
              setType(e.value);
            }}
          />
        </div>
        <div className="dateWrapper">
          <div>
            <div className="registLabel">시작기간</div>
            <DatePicker
              selected={startDate}
              onChange={(val) => {
                setStartDate(val);
              }}
              dateFormat={"y-MM-dd"}
            />
          </div>
          <div>
            <div className="registLabel">종료기간</div>
            <DatePicker
              selected={endDate}
              onChange={(val) => setEndDate(val)}
              dateFormat={"y-MM-dd"}
            />
          </div>
        </div>
        <div className="titleWrapper">
          <div className="registLabel">제목</div>
          <input
            input="text"
            onChange={titleInput.onChange}
            value={titleInput.value}
          />
        </div>
        <CKEditor
          config={{ customConfig: "/static/config/ckeditConfig.js" }}
          ref={editor}
        />
        <div className="skillWrapper">
          <div className="registLabel">사용 기술</div>
          <Select
            options={skillSelectOption}
            components={animatedComponents}
            isMulti
            className="registSelector"
            onChange={(value) => {
              if (value)
                setUseSkill(
                  value.length > 0 ? value.map((skill) => skill.value) : null
                );
              else setUseSkill(null);
            }}
          />
        </div>
        <div className="urlWrapper">
          <div className="registLabel">프로젝트 참고 URL</div>
          <input
            input="text"
            onChange={urlInput.onChange}
            value={urlInput.value}
          />
        </div>
        <div className="giturlWrapper">
          <div className="registLabel">프로젝트 깃허브</div>
          <input
            input="text"
            onChange={gitInput.onChange}
            value={gitInput.value}
          />
        </div>
        <div className="registButtons">
          <button onClick={submitProject}>등록</button>
          <button onClick={() => history.goBack()}>취소</button>
        </div>
      </div>
      <div className="editErrorBox">
        <span>
          <i className="fa fa-exclamation"></i> {error}
        </span>
      </div>
    </section>
  );
}

export default withRouter(ProjectRegistPage);
