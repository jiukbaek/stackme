import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moreProjectAsync } from "../../modules/project";
import ProjectItem from "../../components/ProjectItem";
import "../../css/project.scss";

function ProjectListPage() {
  const dispatch = useDispatch();
  const { loading, projects } = useSelector((state) => state.project);
  const [projectRequest, setProjectRequest] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
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

    if (!projectRequest && scrollHeight - innerHeight - scrollTop < 100) {
      setProjectRequest(true);
      console.log(projectRequest);
    }
  };

  return (
    <div className="publicProjectWrapper">
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
