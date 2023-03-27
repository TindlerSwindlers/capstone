import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileMatches } from '../../store/matches';
import { Box, Card, CardMedia, Typography } from '@mui/material';

const YourMatches = () => {
  const { matches } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileMatches(auth.id));
  }, []);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {matches[0] ? (
        matches.map((match) =>
          match.match?.user2.id !== auth.id ? (
            <Box key={match.id}>
              <Card
                key={match.match?.user2.id}
                sx={{
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '200px',
                  margin: 1,
                  padding: 1,
                  backgroundColor: '#FDEDEC',
                }}
              >
                <Typography variant="body1" sx={{ margin: 1 }}>
                  {match.match?.user2.name} {match.match?.user2.lastName}
                </Typography>
                <CardMedia
                  sx={{ width: '200px', height: '200px' }}
                  image={match.match?.user2.imageUrl}
                  title="image"
                />
                <Typography>
                  Loves {match.match?.user2.hobbies.join(', ')}
                </Typography>
              </Card>
            </Box>
          ) : (
            <Box key={match.id}>
              <Card
                key={match.match?.user1.id}
                sx={{
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '200px',
                  margin: 1,
                  padding: 1,
                  backgroundColor: '#FDEDEC',
                }}
              >
                <Typography variant="body1" sx={{ margin: 1 }}>
                  {match.match?.user1.name} {match.match?.user1.lastName}
                </Typography>
                <CardMedia
                  sx={{ width: '200px', height: '200px' }}
                  image={match.match?.user1.imageUrl}
                  title="image"
                />
                <Typography>
                  Loves {match.match?.user1.hobbies.join(', ')}
                </Typography>
              </Card>
            </Box>
          )
        )
      ) : (
        <p>No matches at this moment. Try to send a spark to someone!</p>
      )}
    </Box>
  );
};

export default YourMatches;
