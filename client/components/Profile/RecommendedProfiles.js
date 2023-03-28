import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecommended } from "../../store/auth";
import { Box, Card, CardMedia, Typography } from "@mui/material";

const RecommendedProfiles = ({ userId }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommended(userId));
  }, []);

  return (
    <div>
      <p>Your recommended profiles:</p>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {auth.profiles &&
          auth.profiles.map((profile) => (
            <Card
              key={profile.id}
              sx={{
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "200px",
                margin: 1,
                padding: 1,
                backgroundColor: "#FDEDEC",
              }}
            >
              <Link
                to={{
                  pathname: `/profile/${profile.id}`,
                  state: {
                    from: "recommended",
                  },
                }}
              >
                <Typography variant='body1' sx={{ margin: 1 }}>
                  {profile.name} {profile.lastName}
                </Typography>
              </Link>
              <CardMedia
                sx={{ width: "200px", height: "200px" }}
                image={profile.imageUrl}
                title='image'
              />
              <Typography>Loves {profile.hobbies.join(", ")}</Typography>
            </Card>
          ))}
      </Box>
    </div>
  );
};

export default RecommendedProfiles;
