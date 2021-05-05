import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'

import * as d3Zoom from 'd3-zoom';
import * as d3Select from 'd3-selection';


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
    const s = useStyles();

    const [imageUrl, setImageUrl] = useState('');
    const [svgTransform, setSvgTransform] = useState();

    useEffect(()=>{
      setImageUrl(props.file.link);
    }, [props]);

    const container = useCallback(node => {
      if (node) {
        const selection = d3Select.select(node);
  
        const zoom = d3Zoom.zoom()
          .on('zoom', event => {
            const { transform } = event;
            const { height, width } = node.getBoundingClientRect();
  
            // Calculate maximum translation
            const maxX = -width * (transform.k - 1);
            const maxY = -height * (transform.k - 1);
  
            // Prevent from dragging image out of SVG
            transform.x = transform.x > 0 ? 0 : transform.x;
            transform.x = transform.x < maxX ? maxX : transform.x;
            transform.y = transform.y > 0 ? 0 : transform.y;
            transform.y = transform.y < maxY ? maxY : transform.y;
  
            setSvgTransform(transform);
          })
          .scaleExtent([1, 5]);
  
        selection.call(zoom);
      }
    }, []);

    if(!imageUrl)
      return null;

    return(
      <>
        {/* We are rendering invisible image to get its width and height */}
        <img
          alt={props.file.originalName}
          className={s.image}
          src={imageUrl}
        />
        {/* SVG element used by D3 */}
        <svg className={s.container} ref={container}>
          <image
            alt={props.file.originalName}
            height="100%"
            transform={svgTransform}
            width="100%"
            xlinkHref={imageUrl}
          />
        </svg>
      </>
    )
}

export default ImageViewer;