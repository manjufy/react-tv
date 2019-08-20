import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

// State
const initState = {
    loading: false,
    show: [],
    error: null,
};

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case "MOVIE":
            return {
                ...state,
                loading: action.loading,
                show: action.payload,
                error: null,
            };
        default:
            return state;
    }
}

// Theme style
const useStyles = makeStyles(theme => ({
    mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginTop: theme.spacing(7),
    backgroundImage: `url(https://source.unsplash.com/user/erondu)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '500px',
    },
    overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
    },
    },
    mainGrid: {
    marginTop: theme.spacing(3),
    },
    card: {
    display: 'flex',
    },
    cardDetails: {
    flex: 1,
    },
    cardMedia: {
    width: 160,
    },
    markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
    },
    sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
    marginTop: theme.spacing(3),
    },
    footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
    },
  }));

export default function Show({ match }) {
    const showId = match.params.id;
    const classes = useStyles();

    const getImage = (images) => {
        return images[0].url;
    };

    // State
    const [state, dispatch] = useReducer(reducer, initState);
    const url = `https://cdn-discover.hooq.tv/v1.2/discover/titles/${showId}`
    useEffect(() => {
        fetch(url)
            .then(data => data.json())
            .then(show => {
                dispatch({
                    type: "MOVIE",
                    payload: show.data,
                    loading: true,
                });
            });
    }, []);

    const { show, error, loading } = state;
  return (
    <React.Fragment>
        <main>
          {
            loading &&
            <Paper className={classes.mainFeaturedPost}>
                {
                <img
                    style={{ display: 'none', height: '100%' }}
                    src={getImage(show.images)}
                    alt="background"
                />
                }
                <div className={classes.overlay} />
                <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        {show.title}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                        {show.short_description}
                    </Typography>
                    </div>
                </Grid>
                </Grid>
            </Paper>
        }
        <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={12}>
                <Typography variant="h6" gutterBottom>
                    <strong>Asset Type: </strong>{show.as}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <Typography variant="h6" gutterBottom>
                    Description
                </Typography>
                <Divider />
                    <br/>
                    <Typography component="span">
                        {show.description}
                    </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <Typography variant="h6" gutterBottom>
                    Tags
                </Typography>
                <Divider />
                    <br/>
                    <Typography component="span">
                        {show.tags && show.tags.map(tag => (
                            <Chip key={tag.id} label={tag.label} className={classes.chip} />
                        ))}
                    </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <Typography variant="h6" gutterBottom>
                    Others
                </Typography>
                <Divider />
                    <br/>
                    <Typography component="span">
                        <strong>Age Rating:</strong> {show && show.meta && show.meta.ageRating}
                    </Typography>
                    <br/>
                    <Typography component="span">
                        <strong>Released Year</strong> {show && show.meta && show.meta.releaseYear}
                    </Typography>
            </Grid>
        </Grid>
        </main>
    </React.Fragment>
  );
}