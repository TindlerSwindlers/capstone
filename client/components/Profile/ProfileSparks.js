import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileHalfways } from "../../store/halfways";
import { Link } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";

const ProfileSparks = ({ id }) => {
  const { halfways } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileHalfways(id));
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {halfways[0] &&
          halfways.map((halfway) => (
            <Card
              key={halfway.id}
              sx={{
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "200px",
                margin: 1,
                padding: 1,
                backgroundColor: "#fff59d",
              }}
            >
              <Typography variant='body1' sx={{ margin: 1 }}>
                Who already likes you:
              </Typography>
              <Link
                key={halfway.id}
                to={{
                  pathname: `/profile/${halfway.currentUser.id}`,
                  state: {
                    from: "halfways",
                  },
                }}
              >
                <Typography variant='body1' sx={{ margin: 1 }}>
                  {halfway.currentUser.name}
                </Typography>
              </Link>
            </Card>
          ))}
      </Box>
    </div>
  );
};

export default ProfileSparks;
