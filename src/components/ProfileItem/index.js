import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import { useDispatch } from "react-redux";
import { modifyUserAsync } from "../../modules/user";

function ProfileItem({ title, content = "", type }) {
  const [edit, setEdit] = useState(false);
  const { value, setValue, onChange } = useInput(content ? content : "");

  const dispatch = useDispatch();

  const onSave = async () => {
    await dispatch(modifyUserAsync({ [type]: value }));
    setEdit(false);
  };

  return (
    <div className="profileItem">
      <div className="profileItemInfo">
        <div className="profileItemTitle">{title}</div>
        <div className="profileItemContent">
          {!edit && (content ? content : "정보 없음")}
          {edit && <input type="text" value={value} onChange={onChange} />}
        </div>
      </div>
      <div className="profileItemEdit">
        {!edit && (
          <button
            className="icon icon-pencil"
            onClick={() => setEdit(true)}
          ></button>
        )}
        {edit && (
          <>
            <button onClick={onSave}>저장</button>
            <button
              onClick={() => {
                setValue(content);
                setEdit(false);
              }}
            >
              취소
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default ProfileItem;
