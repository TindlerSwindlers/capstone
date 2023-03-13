import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommended } from '../store/auth';
import Box from '@mui/material/Box';

const RecommendedProfiles = ({ userId }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommended(userId));
  }, []);

  return (
    <div>
      <p>Your recommended profiles:</p>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {auth.profiles &&
          auth.profiles.map((profile) => (
            <Box
              key={profile.id}
              sx={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <p>
                {profile.name} {profile.lastName}
              </p>
              <img
                src={profile.imageUrl}
                style={{ width: '200px', height: '200px' }}
              />
              <p>Hobbies: {profile.hobbies.join(', ')}</p>
            </Box>
          ))}
      </Box>
    </div>
  );
};

export default RecommendedProfiles;
