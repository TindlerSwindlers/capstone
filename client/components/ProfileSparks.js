import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileHalfways } from "../store/halfways";
import { Link } from "react-router-dom";

const ProfileSparks = ({ id }) => {
  const { halfways } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileHalfways(id));
  }, []);

  return (
    <div>
      {halfways[0] &&
        halfways.map((halfway) => (
          <Link
            key={halfway.id}
            to={{
              pathname: `/profile/${halfway.currentUser.id}`,
              state: {
                from: "halfways",
              },
            }}
          >
            {halfway.currentUser.name}
          </Link>
        ))}
    </div>
  );
};

export default ProfileSparks;
