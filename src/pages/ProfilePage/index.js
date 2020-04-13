import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../css/profile.scss";
import { getUserAsync } from "../../modules/user";
import ProfileItem from "../../components/ProfileItem";
import { getCareerAsync } from "../../modules/career";
import CareerBox from "../../components/CareerBox";

function Profile() {
  const { currentUser } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { careers } = useSelector((state) => state.career);
  const dispatch = useDispatch();

  const getUser = async () => {
    await dispatch(getUserAsync(currentUser.user_id));
  };

  const getCareer = async () => {
    await dispatch(getCareerAsync());
  };

  useEffect(() => {
    getUser();
    getCareer();
  }, []);

  return (
    <section className="profilePageWrapper">
      <div className="profileWrapper">
        <div className="wrapperTitle">기본 정보</div>
        {user && (
          <>
            <ProfileItem title={"이름"} content={user.name} type={"name"} />
            <ProfileItem
              title={"생년월일"}
              content={user.birth}
              type={"birth"}
            />
            <ProfileItem title={"이메일"} content={user.email} type={"email"} />
            <ProfileItem
              title={"깃허브"}
              content={user.git_url}
              type={"git_url"}
            />
          </>
        )}
      </div>
          
      <CareerBox action={"write"} />
      {careers &&
        careers.map((career) => <CareerBox key={career.id} career={career} />)}
    </section>
  );
}

export default Profile;
