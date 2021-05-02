import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    loadingWrapper: {
      height: '100%',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      width: '100%',
    },
}));

function Viewer(props) {
    const [isLoading, setIsLoading] = useState(true);
    const s = useStyles();
    
}

export default Viewer;