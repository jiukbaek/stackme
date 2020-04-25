import React from "react";

function DeleteItem({ onSubmit, onCancle, type }) {
  return (
    <div className="deleteItemWrapper">
      <div className="deleteItemLabel">{type} 삭제</div>
      <div className="deleteItemContent">
        삭제된 {type}(은)는 복구 할 수 없습니다.
        <br />
        해당 {type}(을)를 삭제하시겠습니까?
      </div>
      <div className="deleteItemButtons">
        <button onClick={onSubmit}>확인</button>
        <button onClick={onCancle}>취소</button>
      </div>
    </div>
  );
}

export default DeleteItem;
