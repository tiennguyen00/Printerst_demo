import React, { useState, useCallback,  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { showViewer } from '../../redux/viewer/viewerAction';

import './video1.scss'

const useStyles = makeStyles(theme => ({
    button: {
        cursor: 'pointer',
    },
    imageContainer: {
        height: '100%',
        width: '100%',
        paddingTop: '75%',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    container: props => ({
        alignItems: 'center',
        background: theme.palette.grey[200],
        borderRadius: 2,
        display: 'flex',
        height: props.height,
        justifyContent: 'center',
        position: 'relative',
        width: props.width,
    }),
    thumbnail: props => ({
        height: props.height,
        left: 0,
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        transition: 'opacity 0.2s ease-out',
        width: props.width,
    }),
    highQuality: {
        opacity: 0.95
    },
    lowQuality: {
        filter: 'blur(10px)',
        transform: 'scale(1)',
    },
    thumbnailContainer: {
        textAlign: 'center',
        height: '100%',
        overflow: 'hidden',
        paddingTop: '75%',
        position: 'relative',
        width: '100%'
    },
    thumbnailItem: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    helperText: {
        color: 'var(--pb-gray-400)',
        fontSize: '0.5em',
        textTransform: 'none',
    },
}))

export default function Video1(props) {
    const s = useStyles({
        height: props.height,
        width: props.width,
    });
    const onImageError = useCallback(() => {
        // setImageVisible(false);
    }, []);

    const [imageVisible, setImageVisible] = useState(true);
    const shouldShowThumbnail = imageVisible;
    const dispatch = useDispatch();
    const onClick = fileId => {
        dispatch(showViewer(fileId));
    }

    const renderThumbnailElements = () => {
        return (
            <div className={s.imageContainer}>
                {/* <img
                    onClick={() => console.log(":Hui")}
                    alt="name"
                    className={clsx(s.thumbnail, s.lowQuality, { [s.button]: !!props.onClick })}
                    onError={onImageError}
                    src={props.link}
                /> */}
                <video
                    alt="name"
                    className={clsx(s.thumbnail, s.highQuality)}
                    onError={onImageError}
                    src={props.link}
                    controls>
                        <source src="https://drive.google.com/uc?id=1dE_dbgxeP_EMJOqLYu5Mq3NxGrQu1z2X"
                    type="video/mp4"/>
                </video>
            </div>
        )
    }    
    return (
        <div
            className={clsx(s.container, '')} //props.className
            onlick={props.onClick}
        >
            {shouldShowThumbnail
                ? renderThumbnailElements()
                : (<Grid className={s.thumbnailContainer}>
                    <div className={s.thumbnailItem}>
                      <div>
                        <Typography className={s.format} variant="button">getFileFormat</Typography>
                        {/* {getFileFormat(props.file.name)} */}
                         <Typography className={s.helperText} variant="body2">Thumbnail is being generated. It could take up to 2 minutes.</Typography>
                      </div>
                     </div>
                  </Grid>)}
        </div>
    )
}
