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
import { makeDate } from "../../utils";

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

  const resetInputs = () => {
    companyInput.setValue(career ? career.company : "");
    dutyInput.setValue(career ? career.duty : "");
    setJoinDate(career ? new Date(career.join_date) : "");
    setEndDate(
      career ? (career.end_date ? new Date(career.end_date) : "") : ""
    );

    if (myAction === "modify") {
      setMyAction("");
    }
  };

  const deleteCareer = (id) => {
    dispatch(deleteCareerAsync(id));
  };

  const modifyCareer = (id) => {
    const company = companyInput.value;
    const duty = dutyInput.value;
    const join_date = makeDate(joinDate);
    const end_date = endDate ? makeDate(endDate) : null;

    if (!company || !duty || !join_date) {
      console.log("정보 부족");
      return;
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
  };

  const createCareer = () => {
    dispatch(
      createCareerAsync(
        companyInput.value,
        dutyInput.value,
        makeDate(joinDate),
        endDate ? makeDate(endDate) : null
      )
    );
  };

  return (
    <div className="careerWrapper">
      <div className="wrapperTitle">
        {myAction ? (myAction === "write" ? "경력 추가" : "경력 수정") : "경력"}
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
              onClick={() => deleteCareer(career.id)}
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
      {myAction && (
        <div className="careerButtons">
          {myAction === "write" && (
            <button
              className="addButton"
              onClick={() => {
                createCareer();
                resetInputs();
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
