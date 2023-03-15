import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleProfile } from "../store/auth";
import { fetchProfileHalfways } from "../store/halfways";

const ProfileSparks = ({ id }) => {
  const { halfways } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileHalfways(id));
  }, []);

  //   const halfwayProfiles = halfways.map((halfway) => {
  //     return dispatch(singleProfile(halfway.currentUser));
  //   });

  console.log("halfways ", halfways);

  return (
    <div>
      {halfways &&
        halfways.map((halfway) => (
          <p key={halfway.id}>{halfway.currentUser.name}</p>
        ))}
    </div>
  );
};

export default ProfileSparks;
