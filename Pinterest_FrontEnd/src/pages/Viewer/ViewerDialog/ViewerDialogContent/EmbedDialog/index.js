import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '../../../../../UI/Dialog';
import EmbedDialogContent from './EmbedDialogContent';

const useStyles = makeStyles(() => ({
    dialogPaper: {
      maxWidth: 500,
      width: '100%',
    },
}));

function EmbedDialog(props) {
    const s = useStyles();

    return(
        <Dialog
            classes={{ paper: s.dialogPaper }}
            hideDialogActions
            onClose={props.onClose}
            open={props.open}
            title="Embed Content"
        >
            <EmbedDialogContent item={props.item} />
        </Dialog>
    )
}

EmbedDialog.propTypes = {
    item: PropTypes.shape(),
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
};
  
EmbedDialog.defaultProps = {
    item: undefined,
    open: false,
};
export default EmbedDialog;