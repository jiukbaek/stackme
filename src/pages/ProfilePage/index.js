import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../css/profile.scss";
import { getUserAsync } from "../../modules/user";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getUserAsync(1)), []);

  return (
    <section className="profilePageWrapper">
      <div className="profileWrapper"></div>
    </section>
  );
};

export default Profile;
