import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../Hooks/useInput";
import {
  createCareerAsync,
  modifyCareerAsync,
  deleteCareerAsync,
} from "../../modules/career";
import DatePicker from "react-datepicker";
import "../../css/react-datepicker.css";
import { makeDate, checkDateRange } from "../../utils";
import ModalBox from "../ModalBox";
import DeleteItem from "../DeleteProject";

const CareerItem = ({
  title,
  content = "",
  action,
  inputClass = "",
  input,
  date = false,
}) => {
  return (
    <div className="careerItem">
      <div className="careerItemTitle">{title}</div>
      <div className="careerItemContent">
        {action ? (
          !date ? (
            <input
              type="text"
              value={input.value}
              onChange={input.onChange}
              className={inputClass}
            />
          ) : (
            <DatePicker
              selected={input.value}
              onChange={(val) => input.onChange(val)}
              dateFormat={"y-MM-dd"}
            />
          )
        ) : (
          content
        )}
      </div>
    </div>
  );
};

function CareerBox({ action = "", career = null }) {
  const dispatch = useDispatch();
  const [myAction, setMyAction] = useState(action);

  const id = career ? career.id : null;

  const companyInput = useInput(career ? career.company : "");
  const dutyInput = useInput(career ? career.duty : "");
  const [joinDate, setJoinDate] = useState(
    career ? new Date(career.join_date) : ""
  );
  const [endDate, setEndDate] = useState(
    career ? (career.end_date ? new Date(career.end_date) : "") : ""
  );

  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const resetInputs = () => {
    companyInput.setValue(career ? career.company : "");
    dutyInput.setValue(career ? career.duty : "");
    setJoinDate(career ? new Date(career.join_date) : "");
    setEndDate(
      career ? (career.end_date ? new Date(career.end_date) : "") : ""
    );
    setError("");

    if (myAction === "modify") {
      setMyAction("");
    }
  };

  const deleteInitCareer = () => {
    setDeleteTarget(null);
  };

  const deleteCareerConfirm = (id) => {
    setDeleteTarget(id);
  };

  const deleteCareer = async () => {
    await dispatch(deleteCareerAsync(deleteTarget));
    deleteInitCareer();
  };

  const modifyCareer = (id) => {
    const company = companyInput.value;
    const duty = dutyInput.value;
    const join_date = makeDate(joinDate);
    const end_date = endDate ? makeDate(endDate) : null;

    if (!company) {
      setError("회사명은 필수항목입니다.");
      return false;
    }
    if (!duty) {
      setError("맡은 업무는 필수항목입니다.");
      return false;
    }
    if (!join_date) {
      setError("입사날짜는 필수항목입니다.");
      return false;
    }

    if (endDate && !checkDateRange(joinDate, endDate)) {
      setError("날짜범위가 올바르지 않습니다.");
      return false;
    }

    dispatch(
      modifyCareerAsync(id, {
        company,
        duty,
        join_date,
        end_date,
      })
    );

    setMyAction("");
    resetInputs();
  };

  const createCareer = () => {
    const company = companyInput.value;
    const duty = dutyInput.value;

    if (!company) {
      setError("회사명은 필수항목입니다.");
      return false;
    }
    if (!duty) {
      setError("맡은 업무는 필수항목입니다.");
      return false;
    }
    if (!joinDate) {
      setError("입사날짜는 필수항목입니다.");
      return false;
    }

    if (endDate && !checkDateRange(joinDate, endDate)) {
      setError("날짜범위가 올바르지 않습니다.");
      return false;
    }

    const join_date = makeDate(joinDate);
    const end_date = endDate ? makeDate(endDate) : null;

    dispatch(createCareerAsync(company, duty, join_date, end_date));

    resetInputs();
  };

  return (
    <>
      <div className="careerWrapper">
        <div className="wrapperTitle">
          {myAction
            ? myAction === "write"
              ? "경력 추가"
              : "경력 수정"
            : "경력"}
          {!myAction && (
            <>
              <button
                className="careerModifyButton"
                onClick={() => setMyAction("modify")}
              >
                <i className="icon icon-pencil"></i>
              </button>
              <button
                className="careerDeleteButton"
                onClick={() => deleteCareerConfirm(career.id)}
              >
                <i className="icon icon-trash"></i>
              </button>
            </>
          )}
        </div>
        <div className="careerRowWrapper">
          <CareerItem
            title={"회사 명"}
            action={myAction}
            content={career ? career.company : ""}
            input={companyInput}
          />
        </div>
        <div className="careerRowWrapper">
          <CareerItem
            title={"맡은 업무"}
            action={myAction}
            content={career ? career.duty : ""}
            inputClass={"dutyInput"}
            input={dutyInput}
          />
        </div>
        <div className="careerRowWrapper">
          <CareerItem
            title={"입사 날짜"}
            action={myAction}
            content={career ? career.join_date : ""}
            input={{ value: joinDate, onChange: setJoinDate }}
            date={true}
          />
          <CareerItem
            title={"퇴사 날짜"}
            action={myAction}
            content={
              career ? (career.end_date ? career.end_date : "재직 중") : ""
            }
            input={{ value: endDate, onChange: setEndDate }}
            date={true}
          />
        </div>
        <div className="careerBoxError">{error}</div>
        {myAction && (
          <div className="careerButtons">
            {myAction === "write" && (
              <button
                className="addButton"
                onClick={() => {
                  createCareer();
                }}
              >
                추가
              </button>
            )}
            {myAction === "modify" && (
              <button
                className="addButton"
                onClick={() => {
                  modifyCareer(id);
                }}
              >
                수정
              </button>
            )}
            <button onClick={resetInputs}>
              {myAction === "write" ? "초기화" : "취소"}
            </button>
          </div>
        )}
      </div>
      {deleteTarget && (
        <ModalBox>
          <DeleteItem
            type="경력"
            onSubmit={deleteCareer}
            onCancle={deleteInitCareer}
          />
        </ModalBox>
      )}
    </>
  );
}

export default CareerBox;
