import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Dialog } from "@material-ui/core";

import ViewerDialogContent from "./ViewerDialogContent";

const useStyles = makeStyles(() => ({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, .85)",
  },
}));

function ViewerDialog() {
  const s = useStyles();

  const viewerState = useSelector((state) => state.viewerReducer);

  return (
    <Dialog
      BackdropProps={{
        classes: {
          root: s.backdrop,
        },
      }}
      open={viewerState.visible}
      PaperComponent={(p) => <div>{p.children}</div>}
      children=""
    >
      <ViewerDialogContent />
    </Dialog>
  );
}

export default ViewerDialog;
