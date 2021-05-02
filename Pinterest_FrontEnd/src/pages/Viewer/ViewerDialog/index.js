import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Dialog } from '@material-ui/core';

import ViewerDialogContent from './ViewerDialogContent';

const useStyles = makeStyles(() => ({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, .85)',
      },
}));

function ViewerDialog() {
    const s = useStyles();

    const viewerState = useSelector(state => state.viewerReducer);
    console.log("ViewerState: ", viewerState);

    return (
        <Dialog
            BackdropProps={{
                classes: {
                    root: s.backdrop,
                },
            }}
            open={viewerState.visible}
            PaperComponent={p => (
                <div>{p.children}</div>
            )}
        >
            <ViewerDialogContent/>
        </Dialog>
    )
}

export default ViewerDialog;