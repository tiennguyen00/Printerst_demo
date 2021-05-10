import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar as MUISnackbar } from '@material-ui/core';
import  { Alert }  from '@material-ui/lab';

const POPUP_MESSAGE = {
    ERROR: 'error',
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
};

function Snackbar(props) {
    return (
      <MUISnackbar
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        autoHideDuration={3000}
        open={!!props.message}
        {...props}
      >
        {props.type && (
          <Alert elevation={6} severity={props.type} variant="filled">
            {props.message}
          </Alert>
        )}
      </MUISnackbar>
    );
}

Snackbar.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf([undefined, ...Object.values(POPUP_MESSAGE)]),
};

Snackbar.defaultProps = {
    message: undefined,
    type: undefined,
};

export default Snackbar;