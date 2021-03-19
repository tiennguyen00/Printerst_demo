import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { usePromiseTracker } from 'react-promise-tracker';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const Loading = () => {
    const classes = useStyles();
  
    const { promiseInProgress } = usePromiseTracker();
    return (
      <Backdrop className={classes.backdrop} open={promiseInProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
};

export { Loading };