import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../Hooks/useInput";
import { createCareerAsync, modifyCareerAsync } from "../../modules/career";

const CareerItem = ({
  title,
  content = "",
  action,
  inputClass = "",
  input
}) => {
  return (
    <div className="careerItem">
      <div className="careerItemTitle">{title}</div>
      <div className="careerItemContent">
        {action ? (
          <input
            type="text"
            value={input.value}
            onChange={input.onChange}
            className={inputClass}
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
};

function CareerBox({ action = "", career = {} }) {
  const dispatch = useDispatch();
  const [myAction, setMyAction] = useState(action);

  const id = career ? career.id : null;

  const companyInput = useInput(career ? career.company : "");
  const dutyInput = useInput(career ? career.duty : "");
  const joinDateInput = useInput(career ? career.join_date : "");
  const endDateInput = useInput(
    career ? (career.end_date ? career.end_date : "") : ""
  );

  const resetInputs = () => {
    companyInput.setValue(career ? career.company : "");
    dutyInput.setValue(career ? career.duty : "");
    joinDateInput.setValue(career ? career.join_date : "");
    endDateInput.setValue(
      career ? (career.end_date ? career.end_date : "") : ""
    );
    if (myAction === "modify") {
      setMyAction("");
    }
  };

  const modifyCareer = id => {
    const company = companyInput.value;
    const duty = dutyInput.value;
    const join_date = joinDateInput.value;
    const end_date = endDateInput.value;

    if (!company || !duty || !join_date) {
      console.log("정보 부족");
      return;
    }

    dispatch(
      modifyCareerAsync(id, {
        company,
        duty,
        join_date,
        end_date: end_date ? end_date : null
      })
    );

    setMyAction("");
  };

  const createCareer = () => {
    dispatch(
      createCareerAsync(
        companyInput.value,
        dutyInput.value,
        joinDateInput.value,
        endDateInput.value ? endDateInput.value : null
      )
    );
  };

  return (
    <div className="careerWrapper">
      <div className="wrapperTitle">
        {myAction ? (myAction === "write" ? "경력 추가" : "경력 수정") : "경력"}
        {!myAction && (
          <button
            className="careerModifyButton"
            onClick={() => setMyAction("modify")}
          >
            <i className="icon icon-pencil"></i>
          </button>
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
          input={joinDateInput}
        />
        <CareerItem
          title={"퇴사 날짜"}
          action={myAction}
          content={
            career ? (career.end_date ? career.end_date : "재직 중") : ""
          }
          input={endDateInput}
        />
      </div>
      {myAction && (
        <div className="careerButtons">
          {myAction === "write" && (
            <button
              className="addButton"
              onClick={() => {
                createCareer();
                companyInput.setValue("");
                dutyInput.setValue("");
                joinDateInput.setValue("");
                endDateInput.setValue("");
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
  );
}

export default CareerBox;
