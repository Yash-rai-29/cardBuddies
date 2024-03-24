import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Card, CardContent, Typography, TextField } from '@mui/material';
import { Transition } from 'react-transition-group';
import { Edit } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    maxWidth: '600px',
    margin: 'auto',
    padding: theme.spacing(4),
  },
  profileCard: {
    marginBottom: theme.spacing(2),
  },
  editButton: {
    marginLeft: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('JohnDoe');

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className={classes.profileContainer}>
      <Card className={classes.profileCard}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Profile
            <Button
              className={classes.editButton}
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Edit />}
              onClick={handleEdit}
            >
              Edit
            </Button>
          </Typography>
          <Transition in={editMode} timeout={300}>
            {(state) => (
              <div style={{
                transition: `opacity 300ms ease-in-out`,
                opacity: state === 'entered' ? 1 : 0,
              }}>
                <TextField
                  id="username"
                  label="Username"
                  fullWidth
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
            )}
          </Transition>
        </CardContent>
      </Card>
      {/* Other cards and functionality */}
      {/* Banks card */}
      <Card className={classes.profileCard}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Banks
          </Typography>
          {/* Show added banks */}
          {/* If not added, show button */}
          <Button variant="contained" color="primary">
            Add Bank
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
