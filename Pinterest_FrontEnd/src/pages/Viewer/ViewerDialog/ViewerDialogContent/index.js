import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
// import copy from 'copy-to-clipboard';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import {
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";

import { hideViewer } from "../../../../redux/viewer/viewerAction";
import { setMessage } from "../../../../redux/message/messageActions";
import { fileService } from "../../../../services/file.service";
import Viewer from "../../Viewer/index";
import Loading from "../../../../UI/Loading";
import EmbebDialog from "./EmbedDialog";
import Dialog from "../../../../UI/Dialog";
import DetailsPanel from "../../Viewer/DetailsPanel/index";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CodeIcon from "@material-ui/icons/Code";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  containerWithDetailer: {
    paddingRight: 250,
  },
  fileName: {
    color: theme.palette.common.white,
  },
  fullScreenViewerContainer: {
    "& > *:first-child": {
      height: "100vh !important",
      width: "100vw !important",
    },
    background: "none !important",
    boxShadow: "none !important",
    transform: "translateY(0px) !important",
  },
  ghostContainer: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    overflow: "auto",
    width: "100vw",
  },
  icon: {
    color: theme.palette.common.white,
  },
  loadingWrapper: {
    height: "100%",
    left: 0,
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    width: "100%",
  },
  nameItem: {
    flexGrow: 1,
  },
  paper: {
    background: theme.palette.common.black,
    margin: "130px",
    maxWidth: "initial",
    overflow: "hidden",
    transform: `translateY(${theme.spacing(3)}px)`,
  },
  toolbar: {
    background:
      "linear-gradient(180deg, rgba(0, 0, 0, .5) 20%, rgba(0, 0, 0, 0))",
    left: 0,
    padding: theme.spacing(1),
    position: "absolute",
    top: 0,
    zIndex: 1, // Above viewer content
  },
  toolbarWithDetails: {
    width: `calc(100% - 250px)`,
  },
}));

function ViewerDialogContent() {
  const s = useStyles();

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);
  const [embedDialogOpened, setEmbedDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState({}); //Chứa nội dung của file khi click vào.
  const [apiError, setApiError] = useState();

  const dispatch = useDispatch();

  const viewerState = useSelector((state) => state.viewerReducer);

  //Khi user thêm ảnh hoặc xóa ảnh thì sẽ thay đổi biến này dê load lại hình ảnh
  const isLoad = useSelector((state) => state.userReducer.isLoad);

  useEffect(() => {
    if (viewerState.fileId) {
      fileService
        .getFileById(viewerState.fileId)
        .then((res) => {
          setFile(res[0]);
        })
        .catch((err) => setApiError(err.message));
    }
  }, []);

  // const content = useSelector(state => getContentById(state, viewerState.fileId)) || {};
  const isContentPublic = true;

  // const content = useSelector(state => getContentById(state, viewerState.fileId)) || {};
  const isFullScreenViewer = true;

  const fileNotFound = true;

  const handleFileDelete = () => {
    // const array = [file.link.split("=")[1], file._id]
    fileService.deleteFileById(file._id).then();

    const handleFileDelete = () => {
      // const array = [file.link.split("=")[1], file._id]
      fileService.deleteFileById(file._id).then();

      dispatch(setMessage("Photo has been deleted.", "success"));
      setDeleteConfirmOpened(false);
      dispatch(hideViewer());
    };

    const downloadLink = () => {
      //Gọi api download ở đây.
    };

    const handleCopyText = (url) => {};

    const onLoad = () => {
      setIsLoading(false);
    };

    const loadingComponent = isLoading ? (
      <div className={s.loadingWrapper}>
        <Loading />
      </div>
    ) : null;

    return (
      <>
        <Grid
          className={clsx(s.toolbar, detailsVisible && s.toolbarWithDetails)}
          container
          wrap="nowrap"
        >
          {/* Xử lý nút đóng hình ảnh */}
          {!isFullScreenViewer && (
            <Grid item>
              <Tooltip title="Close">
                <IconButton
                  className={s.icon}
                  onClick={() => dispatch(hideViewer())}
                >
                  <ChevronLeftIcon style={{ height: 30, width: 30 }} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}

          {/* Tên của file (hình ảnh) */}
          <Grid alignItems="center" className={s.nameItem} container item>
            <Typography className={s.fileName} variant="h6">
              {file?.originalName || ""}
            </Typography>
          </Grid>

          {/* Sao chép dưới dạng thẻ */}
          {isContentPublic && (
            <Grid item>
              <Tooltip title="Embeb">
                <IconButton
                  className={s.icon}
                  onClick={() => setEmbedDialogOpened(true)}
                >
                  <CodeIcon style={{ height: 30, width: 30 }} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}

          {/* Copy-Link */}

          {!isFullScreenViewer && (
            <Grid item>
              <Tooltip title="Delete">
                <IconButton
                  className={s.icon}
                  onClick={() => setDeleteConfirmOpened(true)}
                >
                  <DeleteIcon style={{ height: 30, width: 30 }} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}

          <Grid item>
            <Tooltip title="Download">
              <IconButton className={s.icon} onClick={downloadLink}>
                <GetAppIcon style={{ height: 30, width: 30 }} />
              </IconButton>
            </Tooltip>
          </Grid>
          {!fileNotFound && (
            <Grid item>
              <Tooltip title="Details">
                <IconButton
                  className={s.icon}
                  onClick={() => setDetailsVisible(!detailsVisible)}
                >
                  <InfoOutlinedIcon style={{ height: 30, width: 30 }} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
          {!isFullScreenViewer && (
            <Grid item>
              <Tooltip title="Close">
                <IconButton
                  className={s.icon}
                  onClick={() => dispatch(hideViewer())}
                >
                  <CloseIcon style={{ height: 30, width: 30 }} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}

          <EmbebDialog
            item={!isEmpty(file) ? file : ""}
            onClose={() => setEmbedDialogOpened(false)}
            open={embedDialogOpened}
          />

          <Dialog
            okText="Yes, delete"
            onClose={() => setDeleteConfirmOpened(false)}
            onOk={handleFileDelete}
            open={deleteConfirmOpened}
            title="Are you sure?"
            children=""
          >
            <p>
              {
                "After deleting a file, you won't be able to preview or access it."
              }
            </p>
          </Dialog>
          {loadingComponent}
        </Grid>
        <DetailsPanel file={file} visible={detailsVisible} />
        <Paper
          className={clsx(
            s.paper,
            isFullScreenViewer && s.fullScreenViewerContainer
          )}
          elevation={24}
        >
          <Viewer
            file={file}
            //    detailsVisible = {detailsVisible}
            //    onLoad = {onLoad}
          />
        </Paper>
      </>
    );
  };
}

export default ViewerDialogContent;
