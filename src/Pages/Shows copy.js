import React, { useReducer, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Header from './Partials/Header'

// State
const initState = {
    loading: true,
    shows: [],
    error: null,
};

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case "MOVIES":
            return {
                ...state,
                loading: true,
                shows: action.payload,
                error: null,
            };
        default:
            return state;
    }
}

// Theme style
const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Shows() {
    const classes = useStyles();

    const getPosterImage = (images) => {
        return images.filter(image => image.type === 'POSTER')[0].url;
    };

    // State
    const [state, dispatch] = useReducer(reducer, initState);
    const url = 'https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=1&perPage=20';
    const detailPageURL = `https://cdn-discover.hooq.tv/v1.2/discover/titles`
    useEffect(() => {
        fetch(url)
            .then(data => data.json())
            .then(shows => {
                const multiTitleShows = shows.data.filter(show => show.type === 'Multi-Title-Manual-Curation')
                dispatch({
                    type: "MOVIES",
                    payload: multiTitleShows,
                });
            });
    }, []);

    const { shows, error, loading } = state;
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {
                shows.map(show => (
                    <Grid item key={show.obj_id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <Link href={`${detailPageURL}/${show.row_id}`}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={getPosterImage(show.data[0].images)}
                                title={show.row_name}
                            />
                        </Link>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {show.row_name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                            View
                            </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                ))
            }
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}