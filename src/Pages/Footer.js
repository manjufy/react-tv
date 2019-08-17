import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Album() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            Manju TV
          </Link>{' '}
          {new Date().getFullYear()}
          {'. Built with '}
          <Link color="inherit" href="https://material-ui.com/">
            Material-UI.
          </Link>
        </Typography>
      );
}