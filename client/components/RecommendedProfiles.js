import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommended } from "../store/auth";

const RecommendedProfiles = ({ userId }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommended(userId));
  }, []);

  return (
    <div>
      <p>Your recommended profiles:</p>
      {auth.profiles &&
        auth.profiles.map((profile) => (
          <div key={profile.id}>
            <p>
              {profile.name} {profile.lastName}
            </p>
            <img src={profile.imageUrl} />
            <p>Hobbies: {profile.hobbies}</p>
          </div>
        ))}
    </div>
  );
};

export default RecommendedProfiles;
