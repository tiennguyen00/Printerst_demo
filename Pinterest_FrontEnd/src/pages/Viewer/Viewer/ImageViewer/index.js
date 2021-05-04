import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'


const useStyles = makeStyles(theme => ({
    container: {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    image: {
      marginBottom: `-${theme.spacing(0.5)}px`,
      maxHeight: `calc(100vh - ${theme.spacing(15)}px)`,
      maxWidth: `calc(100vw - ${theme.spacing(30)}px)`,
      visibility: 'hidden',
    },
}));

function ImageViewer(props) {
    const dispatch = useDispatch();
    const s = useStyles();

    const [imageUrl, setImageUrl] = useState('');
    const [svgTransform, setSvgTransform] = useState();

    return(
        <>

        </>
    )
}

export default ImageViewer;