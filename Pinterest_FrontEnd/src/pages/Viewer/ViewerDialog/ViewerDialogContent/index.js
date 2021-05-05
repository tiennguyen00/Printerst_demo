import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
// import copy from 'copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';

import { hideViewer } from '../../../../redux/viewer/viewerAction';
import { setMessage } from '../../../../redux/message/messageActions';
import { fileService } from '../../../../services/file.service';
import Viewer from '../../Viewer/index';
import Loading from '../../../../UI/Loading';
import EmbebDialog from './EmbedDialog';
import Dialog from '../../../../UI/Dialog';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CodeIcon from '@material-ui/icons/Code';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    containerWithDetailer: {
        paddingRight: 250,
    },
    fileName: {
        color: theme.palette.common.white,
    },
    fullScreenViewerContainer: {
        '& > *:first-child': {
            height: '100vh !important',
            width: '100vw !important',
        },
        background: 'none !important',
        boxShadow: 'none !important',
        transform: 'translateY(0px) !important',
    },
    ghostContainer: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        overflow: 'auto',
        width: '100vw',
    },
    icon: {
        color: theme.palette.common.white,
    },
    loadingWrapper: {
        height: '100%',
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    nameItem: {
        flexGrow: 1,
    },
    paper: {
        background: theme.palette.common.black,
        margin: '130px',
        maxWidth: 'initial',
        overflow: 'hidden',
        transform: `translateY(${theme.spacing(3)}px)`,
    },
    toolbar: {
        background: 'linear-gradient(180deg, rgba(0, 0, 0, .5) 20%, rgba(0, 0, 0, 0))',
        left: 0,
        padding: theme.spacing(1),
        position: 'absolute',
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

    const viewerState = useSelector(state => state.viewerReducer);
    useEffect(() => {
        if(viewerState.fileId) {
            fileService.getFileById(viewerState.fileId)
            .then(res => setFile(res[0]))
            .catch(err => setApiError(err.message));
        }
       
    }, []);
    console.log("Files: ", file); 

    // const file = useSelector(state => getFileById(state, viewerState.fileId)) || {};
    // const file = {
    //     addDate: '2021-03-05T14:10:31.754Z',
    //     addUserId: '617cee61-0d2a-44bc-a197-9e5552df65ad',
    //     buildingId: 'c29a3c06-323c-436a-8bde-ee0a94a4cd55',
    //     id: '3e7f7b0b-0dbb-4095-abbc-bc7fabcf42fc',
    //     is360: false,
    //     lastModifiedDate: '2021-03-05T14:10:31.753Z',
    //     name: 'Bruce-Lee.jpeg',
    //     path: 'https://www.w3schools.com/images/lamp.jpg',
    //     sections: [
    //     'photos',
    //     '4415fc68-989c-4168-9f00-936a5b6df739'
    //     ],
    //     size: '29023',
    //     status: 'READY',
    //     tags: []
    // };
    
    // const content = useSelector(state => getContentById(state, viewerState.fileId)) || {};
    const isContentPublic = true;

    const fileNotFound = false;
    const isFullScreenViewer = false; //isEmpty(content) && isEmpty(file);

    // useEffect(() => {
    //     if(isFullScreenViewer) {
    //         return;
    //     }

    //     if(viewerState.fileId && viewerState.fileId !== lastFileId && false) {
    //         lastFileId = viewerState.fileId;
    //         dispatch(addFileStats(building.id, viewerState.fileId))
    //             .then(() => dispatch(fetchFilesStats(building.id)));
    //     }
    // }, [isFullScreenViewer,  viewerState.fileId])

    const handleFileDelete = () => {
        // const array = [file.link.split("=")[1], file._id]
        fileService.deleteFileById(file._id).then(
            
        );

        dispatch(setMessage('File has been deleted.', 'success'));
        setDeleteConfirmOpened(false);
        dispatch(hideViewer());
    }

    const downloadLink = () => {
        //Gọi api download ở đây.
    }

    const handleCopyText = (url) => {

    }

    const onLoad = () => {
        setIsLoading(false);
    }

    const loadingComponent = isLoading
        ? (
            <div className={s.loadingWrapper}>
                <Loading />
            </div>
        )
        : null;

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
                               <ChevronLeftIcon style={{height: 30, width: 30}}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}

                {/* Tên của file (hình ảnh) */}
                <Grid
                    alignItems="center"
                    className={s.nameItem}
                    container
                    item
                >
                    <Typography className={s.fileName} variant="h6">
                        {file?.originalName || ""}
                    </Typography>
                </Grid> 

                {/* Sao chép dưới dạng thẻ */}
                {isContentPublic && (
                    <Grid item>
                        <Tooltip title="Embeb">
                            <IconButton className={s.icon} 
                                onClick={() => setEmbedDialogOpened(true)}
                            >
                                <CodeIcon style={{height: 30, width: 30}}/>
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
                                <DeleteIcon style={{height: 30, width: 30}}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}

                <Grid item>
                    <Tooltip title="Download">
                        <IconButton className={s.icon} onClick={downloadLink}>
                            <GetAppIcon style={{height: 30, width: 30}}/>
                        </IconButton>
                    </Tooltip>  
                </Grid>
                {!fileNotFound && (
                    <Grid item>
                        <Tooltip title="Details">
                            <IconButton className={s.icon} onClick={() => setDetailsVisible(!detailsVisible)}>
                                <InfoOutlinedIcon style={{height: 30, width: 30}}/>
                            </IconButton>
                        </Tooltip>  
                    </Grid>
                )}
                {!isFullScreenViewer && (
                    <Grid item>
                        <Tooltip title="Close">
                            <IconButton className={s.icon} onClick={() => dispatch(hideViewer())}>
                                <CloseIcon style={{height: 30, width: 30}}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}

                {/* <DetailPanel></DetailPanel> */}
                
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
                >
                    <p>
                        {'After deleting a file, you won\'t be able to preview or access it.'}
                    </p>
                </Dialog>
                {loadingComponent}
            
            </Grid>
            <Paper
                    className={clsx(s.paper, isFullScreenViewer && s.fullScreenViewerContainer)}
                    elevation={24}
                >
                    <Viewer 
                       file = {file}
                    //    detailsVisible = {detailsVisible}
                    //    onLoad = {onLoad}

                    />
            </Paper>
        </>
    )
}

export default ViewerDialogContent;
