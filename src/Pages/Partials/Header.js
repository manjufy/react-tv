import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';

export default function Footer() {
    const useStyles = makeStyles(theme => ({
        icon: {
          marginRight: theme.spacing(2),
        },
      }));
    const classes = useStyles();
    return (
        <AppBar>
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              <a href="/" style={{color: 'white', textDecoration: 'none'}}>React TV</a>
            </Typography>
          </Toolbar>
        </AppBar>
    );
}