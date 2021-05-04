import React from 'react';
import PropTypes from 'prop-types';

const isEqual = (prevProps, nextProps) => prevProps.fileId === nextProps.fileId;

// eslint-disable-next-line react/display-name
const MemoizedViewer = React.memo(props => props.viewer, isEqual);

MemoizedViewer.propTypes = {
    viewer: PropTypes.node.isRequired,
};

export default MemoizedViewer;