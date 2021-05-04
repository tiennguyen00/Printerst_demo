import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog as MaterialDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Icon,
  makeStyles,
  Grid,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  actionsLeft: {
    flexGrow: 1,
  },
  closeButton: {
    '&, &:hover, &:focus': {
      background: theme.palette.common.white,
      color: '#434343 !important',
    },
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'translate(50%, -50%)',
  },
  paper: {
    overflowY: 'initial',
  },
}));

function Dialog(props) {
  const s = useStyles();

  const {
    actions,
    actionsLeft,
    cancelText,
    children,
    classes,
    fullWidth,
    hideDialogActions,
    maxWidth,
    okText,
    onClose,
    onOk,
    open,
    title,
    width,
    ...rest
  } = props;

  return (
    <MaterialDialog
      {...rest}
      classes={{
        ...props.classes,
        paper: clsx(s.paper, classes?.paper),
      }}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      width={width}
    >
      <Fab
        aria-label="close"
        classes={{
          root: s.closeButton,
        }}
        color="secondary"
        onClick={onClose}
        size="small"
      >
        <Icon>close</Icon>
      </Fab>
      {props.title && (
        <DialogTitle>{title}</DialogTitle>
      )}
      <DialogContent>
        {children}
      </DialogContent>
      {!hideDialogActions && (
        <DialogActions>
          {actionsLeft && (
            <Grid className={s.actionsLeft}>
              {actionsLeft}
            </Grid>
          )}
          {actions || (
            <>
              <Button
                autoFocus
                color="primary"
                onClick={onClose}
              >
                {cancelText}
              </Button>
              <Button color="primary" onClick={onOk}>
                {okText}
              </Button>
            </>
          )}
        </DialogActions>
      )}
    </MaterialDialog>
  );
}

Dialog.propTypes = {
  actions: PropTypes.shape(),
  actionsLeft: PropTypes.shape(),
  cancelText: PropTypes.string,
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape(),
  fullWidth: PropTypes.bool,
  hideDialogActions: PropTypes.bool,
  maxWidth: PropTypes.string,
  okText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  width: PropTypes.number,
};

Dialog.defaultProps = {
  actions: undefined,
  actionsLeft: undefined,
  cancelText: 'Cancel',
  classes: undefined,
  fullWidth: false,
  hideDialogActions: false,
  maxWidth: 'xs',
  okText: 'Ok',
  onOk: () => {},
  open: false,
  title: undefined,
  width: undefined,
};

export default Dialog;
