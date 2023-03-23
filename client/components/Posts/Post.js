import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, addLikes } from '../../store/posts';
import { setComments } from '../../store/comments';
import { Link } from 'react-router-dom';
import Comment from '../Comments/Comment';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import timeAgo from 'node-time-ago';

const Post = (props) => {
  const { id, text, likes, imageUrl, comments, user, createdAt } = props.post;
  const post = props.post;

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setComments(props.post));
  }, []);

  const handleClick = () => {
    dispatch(deletePost(id));
  };
  const handleLikes = () => {
    dispatch(addLikes(id, auth));
  };

  return (
    <div>
      <Card
        sx={{ width: 400, margin: 1, padding: 1, backgroundColor: '#E8F6F3' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt={user.name}
              src={user.imageUrl}
              sx={{ width: 24, height: 24 }}
            />
            <Typography variant="body1" sx={{ margin: 1 }}>
              {user.name}
            </Typography>
          </CardContent>
          {auth.id === user.id ? (
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                to={{
                  pathname: `/editpost/${id}`,
                  state: {
                    post,
                  },
                }}
              >
                <Button endIcon={<ModeEditIcon />} size="small">
                  Edit
                </Button>
              </Link>
              <Button
                endIcon={<ClearIcon />}
                size="small"
                onClick={handleClick}
              >
                DEL
              </Button>
            </CardActions>
          ) : (
            <span />
          )}
        </Box>
        <CardMedia
          sx={{ height: 300, width: 300, margin: 'auto' }}
          image={imageUrl}
          title="image"
        />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {likes.length} {likes.length > 1 ? 'Likes' : 'Like'}
            </Typography>
            <Button
              endIcon={<FavoriteBorderIcon />}
              size="small"
              onClick={handleLikes}
            ></Button>
          </Box>
          <Typography gutterBottom variant="h5" color="text.secondary">
            {text}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {timeAgo(createdAt)}
          </Typography>
          <Comment comments={comments} postId={id} userId={user.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
