import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../css/myproject.scss";
import { getMyProjectAsync } from "../../modules/project";

function MyProjectPage() {
  const projects = useSelector(state => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProjectAsync());
  }, []);

  console.log(projects);

  return (
    <section className="myProjectPageWrapper">
      <div className="myProjectWrapper">
        <div className="myProjectTop">
          <Link to="/meprojectregist">
            <button>등록</button>
          </Link>
        </div>
        <div className="myProjectListWrapper">
          {projects.projects &&
            projects.projects.map(project => <div>{project.title}</div>)}
        </div>
      </div>
    </section>
  );
}

export default MyProjectPage;
