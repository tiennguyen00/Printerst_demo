import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'rgba(0, 0, 0, .85)',
        color: theme.palette.common.white,
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0,
        width: 0,
        zIndex: 100,
    },
    visible: {
        width: 250,
        display: 'block'
    },
    row: {
        marginTop: '10px'
    }
   
}));
  
function DetailsPanel(props) {
    console.log('props: ', props);
    const s = useStyles();
    const user = useSelector(state => state.userReducer.user);
    console.log('user: ', user);
    

    return(
        <div className={clsx(s.root, props.visible && user._id && s.visible)}>
            <h1>Details:</h1>
           <div className="row">Uploaded:</div>
            {` ${moment(props.file.createdAt).format('MM.DD.YYYY')}`}

            <div className={s.row}>By:</div>
            {` ${user.firstName} ${user.lastName}`}

            {props.file.status !== undefined && (
                <div className={s.row}>Status: {props.file.status}</div>
            )}

            {props.file.updatedAt !== undefined && (
                <div className={s.row}>Last modified: {` ${moment(props.file.updatedAt).format('MM.DD.YYYY')}`}</div>
            )}

            {props.file.size !== undefined && (
                <div className={s.row}>Size: {props.file.size || 0}</div>
            )}

        </div>
    )
}

export default DetailsPanel;