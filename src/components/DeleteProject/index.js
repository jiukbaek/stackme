import React from "react";

function DeleteProject({ deleteProject, deleteInitProject }) {
  return (
    <div className="deleteProjectWrapper">
      <div className="deleteProjectLabel">프로젝트 삭제</div>
      <div className="deleteProjectContent">
        삭제된 프로젝트는 복구 할 수 없습니다.
        <br />
        해당 프로젝트를 삭제하시겠습니까?
      </div>
      <div className="deleteProjectButtons">
        <button onClick={deleteProject}>확인</button>
        <button onClick={deleteInitProject}>취소</button>
      </div>
    </div>
  );
}

export default DeleteProject;
