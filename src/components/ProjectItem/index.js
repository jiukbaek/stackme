import React from "react";
import { getProjectType } from "../../utils";

function ProjectItem({ type, title, thumnail }) {
  return (
    <div className="projectItemWrapper">
      <div className="projectItemInner">
        <div className="projectItemThumnail">
          <img src={`/public/thumnail/${thumnail}`} />
        </div>
        <div className="projectItemType">{getProjectType(type)}</div>
        <div className="projectItemTitle">{title}</div>
      </div>
    </div>
  );
}

export default ProjectItem;
