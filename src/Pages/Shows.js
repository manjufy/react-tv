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
      justifyContent: 'flex-start',
      overflow: 'hidden',
      backgroundColor: 'rgb(242, 242, 247)',
      paddingBottom: theme.spacing(8),
      paddingTop: theme.spacing(4),
      textAlign: 'left',
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      paddingBottom: theme.spacing(4),
    },
    girdListHeader: {
        fontSize: 12,
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
    const search = window.location.search;
    const queryStr = new URLSearchParams(search)
    const page = queryStr.get('page') || 1;
    const perPage = queryStr.get('perPage') || 20;
    const classes = useStyles();

    const getPosterImage = (images) => {
        return images.filter(image => image.type === 'POSTER')[0].url;
    };

    // State
    const [state, dispatch] = useReducer(reducer, initState);
    const url = `https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=${page}&perPage=${perPage}`;
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

    const showDetail = (id) => {
        window.location = `show/${id}`;
    };

    const { shows, error, loading } = state;
  return (
    <React.Fragment>
        <div className={classes.root}>
            {
                !loading && <h5>'....LOADING. PLEASE WAIT FOR A MOMENT'</h5>
            }
            { 
                loading && shows.map(show => (
                <React.Fragment key={show.row_id}>
                    <div style={{ textAlign: 'left' }}>
                        <h2>{show.row_name}</h2>
                    </div>
                    <div>
                        <GridList className={classes.gridList} key={show.row_id} cols={5}>
                            {
                                show.data.map(title => 
                                        (
                                            <GridListTile key={title.id} onClick={(e) => {showDetail(title.id)}}>
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
                    </div>
                </React.Fragment> 
            ))
            }
        </div>
    </React.Fragment>
  );
}