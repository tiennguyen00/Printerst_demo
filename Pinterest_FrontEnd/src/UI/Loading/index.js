import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    position: 'absolute',
  },
  // eslint-disable-next-line sort-keys
  fitContainer: {
    height: '100%',
    width: '100%',
  },
}));

function Loading(props) {
  const s = useStyles();

  return (
    <Grid
      alignItems="center"
      className={clsx(s.root, props.fitContainer && s.fitContainer, props.className)}
      container
      justify="center"
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

Loading.propTypes = {
  className: PropTypes.string,
  fitContainer: PropTypes.bool,
};

Loading.defaultProps = {
  className: undefined,
  fitContainer: false,
};

export default Loading;
