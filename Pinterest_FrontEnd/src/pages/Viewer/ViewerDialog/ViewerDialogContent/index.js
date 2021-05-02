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

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CodeIcon from '@material-ui/icons/Code';

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
        margin: 0,
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

    const dispatch = useDispatch();

    const viewerState = useSelector(state => state.viewerReducer.viewer);
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

    }

    const downloadLink = () => {

    }

    const handleCopyText = (url) => {

    }

    const onLoad = () => {

    }

    const loadingComponent = isLoading
        ? (
            <div className={s.loadingWrapper}>
                {/* <Loading /> */}
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
                        {/* {file?.name || content?.name} */}
                        name
                    </Typography>
                </Grid> 

                {/* Sao chép dưới dạng thẻ */}
                {isContentPublic && (
                    <Grid item>
                        <Tooltip title="Embeb">
                            <IconButton className={s.icon} 
                                // onClick
                            >
                                <CodeIcon style={{height: 30, width: 30}}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}

                {/* Copy-Link */}
                {/* Delete */}
                {/* Download Link */}
                {/* Details */}
                {/* Close */}

                {/* <DetailPanel></DetailPanel> */}
                {/* <EmbebDialog></EmbebDialog> */}
                {/* <Dialog> */}

                <Paper
                    className={clsx(s.paper, isFullScreenViewer && s.fullScreenViewerContainer)}
                    elevation={24}
                >
                    {/* <Viewer /> */}
                </Paper>

            </Grid>
        </>
    )
}

export default ViewerDialogContent;
