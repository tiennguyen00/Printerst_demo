import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MemoizedViewer from './memoizedViewer';
import { getFileFormat } from '../../../util/helper/index';
import Loading from '../../../UI/Loading/index';
import ImageViewer from './ImageViewer';

const IMAGE_FORMATS = ['GIF', 'JPEG', 'JPG', 'PNG', 'TIFF'];
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

// const ImageViewer = React.lazy(() => import('./ImageViewer'));

function Viewer(props) {
  const [isLoading, setIsLoading] = useState(true);
  const s = useStyles();
  const readyForPreview = true;

  return (
    <>
      <ImageViewer file={props.file}/>
    </>
  )

}

export default Viewer;