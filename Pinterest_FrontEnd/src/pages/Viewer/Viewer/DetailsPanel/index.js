import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';

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
        paddingLeft: '10px'
    },
    visible: {
        width: 250,
        display: 'block'
    },
    row: {
        marginTop: '10px'
    },
    title: {
        marginBottom: '20px'
    },
    button: {
        backgroundColor: '#4d1a1f',
        marginTop: '10px',
        padding: '10px',
        color: 'white',
        borderRadius: '8px'
    }
   
}));
  
function DetailsPanel(props) {
    const s = useStyles();
    const user = useSelector(state => state.userReducer.user);

    return(
        <div className={clsx(s.root, props.visible && user._id && s.visible)}>
            <h1 className={s.title}>Details:</h1>

            <div className={s.row}>Uploaded:{` ${moment(props.file.createdAt).format('DD.MM.YYYY')}`}</div>

            {props.file.photoOfUser === "" ? (
                <div className={s.row}>By: {` ${user.firstName} ${user.lastName}`}</div>
            ) : (<div className={s.row}>By: {` ${props.file.photoOfUser}`}</div>)}

            {props.file.status !== undefined && (
                <div className={s.row}>Status: {props.file.status} <CreateIcon style={{height: 20, width: 30}}/></div>
            )}

            {props.file.updatedAt !== undefined && (
                <div className={s.row}>Last modified: {` ${moment(props.file.updatedAt).format('DD.MM.YYYY')}`}</div>
            )}

            {props.file.size !== undefined && (
                <div className={s.row}>Size: {props.file.size || 0}</div>
            )}

            <button className={s.button}>Save</button>

        </div>
    )
}

export default DetailsPanel;