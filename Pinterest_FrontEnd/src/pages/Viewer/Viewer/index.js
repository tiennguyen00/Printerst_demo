import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MemoizedViewer from './memoizedViewer';
import { getFileFormat } from '../../../util/helper/index';

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

const ImageViewer = React.lazy(() => import('./ImageViewer'));

function Viewer(props) {
    const [isLoading, setIsLoading] = useState(true);
    const s = useStyles();
    const { file } = props;
    const readyForPreview = true;
    const fileFormat = getFileFormat(file.originalName);

    const viewer = useRef(); //???


    useEffect(() => {

      const isFileSuported = [...IMAGE_FORMATS].includes(fileFormat);

      if(IMAGE_FORMATS.includes(fileFormat) && readyForPreview) {
        viewer.current = <ImageViewer />
      }

    })

    return (
      <></>
    )

}

export default Viewer;