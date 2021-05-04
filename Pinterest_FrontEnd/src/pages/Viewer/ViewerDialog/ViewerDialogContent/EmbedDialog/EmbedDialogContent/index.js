import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// import copy from 'copy-to-clipboard';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  ButtonBase,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    contentTitle: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(0.5),
    },
    embedOption: {
      border: 'solid transparent 2px',
      height: '100%',
      minHeight: 100,
      padding: theme.spacing(1),
      textAlign: 'left',
      transition: 'border-color 0.1s ease-out',
      width: '100%',
    },
    embedOptionActive: {
      borderColor: theme.palette.primary.main,
    },
    embedOptionButton: {
      height: '100%',
      width: '100%',
    },
    embedOptionWrapper: {
      flexBasis: 0,
      flexGrow: 1,
      margin: theme.spacing(1, 0, 2, 0),
    },
    linkButton: {
      '&:hover, &:focus': {
        background: 'transparent',
        textDecoration: 'none',
      },
      float: 'right',
      fontSize: 14,
      minWidth: 0,
      padding: 0,
    },
    linkButtonLabel: {
      fontWeight: 'normal',
      textTransform: 'none',
    },
    textareaWrapper: {
      paddingBottom: theme.spacing(1.5),
      paddingTop: theme.spacing(1),
    },
    textFieldRoot: {
      '& > div': {
        padding: theme.spacing(1.5, 2),
      },
      '& textarea': {
        fontSize: 14,
      },
      height: 80,
      width: '100%',
    },
}));

function EmbedDialogContent(props) {
    const s = useStyles();
    return (
      <div>
        this is a embebdialogcontent
      </div>
    )

}

export default EmbedDialogContent;