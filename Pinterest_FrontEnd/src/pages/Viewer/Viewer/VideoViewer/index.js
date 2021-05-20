import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Player, BigPlayButton } from 'video-react';

const useStyles = makeStyles(() => ({
    container: {
      height: 480,
      width: 854,
    },
    fullScreen: {
      '& > div': {
        paddingTop: '100vh !important', // Overwrite default video-react css
      },
      height: '100%',
      width: '100%',
    },
}));

function VideoViewer(props) {
    const s = useStyles();

    return (
        <div className={clsx(s.container, props.fullScreen && s.fullScreen)}>
            <Player autoPlay src={props.url}>
                <BigPlayButton position="center" />
            </Player>
        </div>
    )
}

VideoViewer.defaultProps = {
    fullScreen: false,
};

export default VideoViewer;