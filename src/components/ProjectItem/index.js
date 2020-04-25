import React from "react";
import { getProjectType, removeHtml } from "../../utils";

function ProjectItem({ type, title, thumnail, content, onClick }) {
  return (
    <div className="projectItemWrapper" onClick={onClick}>
      <div className="projectItemInner">
        <div className="projectItemThumnail">
          <img src={`/static/public/thumnail/${thumnail}`} />
        </div>
        <div className="projectItemType">{getProjectType(type)}</div>
        <div className="projectItemTitle">{title}</div>
      </div>
    </div>
  );
}

export default ProjectItem;
