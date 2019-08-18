import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

// State
const initState = {
    loading: false,
    shows: [],
    error: null,
};

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case "MOVIES":
            return {
                ...state,
                loading: action.loading,
                shows: action.payload,
                error: null,
            };
        default:
            return state;
    }
}

// Theme style
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      paddingTop: theme.spacing(5),
    },
    title: {
      color: theme.palette.primary.contrastText,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
                    loading: true,
                });
            });
    }, []);

    const { shows, error, loading } = state;
  return (
    <React.Fragment>
        <div className={classes.root}>
            { loading && shows.map(show => (  
                <GridList className={classes.gridList} key={show.row_id} cols={2.5}>
                    {
                        show.data.map(title => 
                                (
                                    <GridListTile key={getPosterImage(title.images)}>
                                        <img src={getPosterImage(title.images)} alt={title.title} />
                                        <GridListTileBar
                                            title={title.title}
                                            classes={{
                                                root: classes.titleBar,
                                                title: classes.title,
                                            }}
                                            actionIcon={
                                                <IconButton aria-label={`star ${title.title}`}>
                                                <StarBorderIcon className={classes.title} />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                )
                            )
                    }
                </GridList> 
            ))
            }
        </div>
    </React.Fragment>
  );
}