import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import { red } from '@material-ui/core/colors';
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../../../redux/user/userAction";
import { userService } from "../../../../services/user.service";
import { getMess } from "../../../../util/message";
import get from "lodash/get";
import { fileService } from '../../../../services/file.service';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to bottom right, #fff2f2 32%, #ff2424 100%)',
        //opacity: '0.9',
        //color: theme.palette.common.black,
        color: 'black',
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
        marginTop: '10px',
        //color: '',
        textshadow: '0px 2px 3px #555'
    },
    userName: {
        marginTop: '10px',
        fontWeight: 'bold',
        textshadow: '0px 2px 3px #555'
    },
    rowDate: {
        color: '#3b3b3b',
        fontSize: '12px',
        textshadow: '0px 2px 3px #555'
    },
    rowMdf: {
        marginTop: '10px',
        color: '#3b3b3b',
        fontSize: '12px',
        textshadow: '0px 2px 3px #555',
        marginLeft: '65px'
    },
    title: {
        color: '#ff6666',
        paddingTop: '18px',
        marginBottom: '20px',
        textShadow: '5px 5px 5px #999966'
    },
    button: {
        backgroundColor: '#a80a0a',
        marginTop: '10px',
        padding: '10px',
        color: 'white',
        borderRadius: '8px',
        marginLeft: '145px'
    },

    textbox: {
        height: '90px',
        width: '200px',
        fontSize: '16px',
        overflow: 'hidden',
        resize: 'none',
        background: '#e03434',
        color: 'white',
        borderRadius: '8px'
    },
    icon: {
        marginLeft: '195px'
    }


}));

function DetailsPanel(props) {
    const [userProfile, setUserProfile] = useState({});
    //const history = get(props, "history", {});
  

   /*  const stateHistory = history.location.state || {};
    console.log(history) */

     /* const [apiError, setApiError] = useState(
         stateHistory.expired ? getMess("M15") : "" // Kiếm tra session timeout chưa
     ); */

    const dispatch = useDispatch();

    const s = useStyles();
    const user = useSelector(state => state.userReducer.user);
    // user.profilePhoto là link avatar đó
/* 
     useEffect(() => {
        //Lấy ảnh đại diện
         const getAvatar = async () => {
             await userService
                 .getProfile()
                 .then((res) => {
                     setUserProfile(res);
                     dispatch(getCurrentUser(res));
                 })
                .catch((err) => {
                     if (err === 400) setApiError("Load fail!!!");
                     else setApiError(err.message);
                 });
         }
         getAvatar();
     }); */
//button save đỏi maui + disable text box = false 
const handleClick = () =>{
    document.getElementById("statusB").removeAttribute("disabled");
    document.getElementById("statusB").setAttribute("style","background-color: #f54c4c;");
    document.getElementById("btnSave").setAttribute("style","background-color: red;");
}

const handleButton = () =>{
    var newStatus = document.getElementById("statusB").value;
    document.getElementById("statusB").setAttribute("style","background-color: #e03434;");
    document.getElementById("btnSave").setAttribute("style","background-color: #a80a0a;");
    document.getElementById("statusB").setAttribute("disabled",true);

    document.getElementById("statusB").value = newStatus;
    const today = new Date().getTime();

    const payLoad = {
        status: newStatus,
        postID: props.file._id,
    }

    fileService.updateFileById(payLoad)
        .then(() => dispatch(getMess("Uploaded", "success")))
        .catch((err) => {
            // dispatch(getMess("Oops, Something wrong", "error"));
            console.log("Err: ", err);
        })
}




    return (
        <div className={clsx(s.root, props.visible && user._id && s.visible)}>
            <h1 className={s.title}>Status:</h1>

            {props.file.photoOfUser === "" ? (
                <div className={s.userName}>  {` ${user.firstName} ${user.lastName}`}</div>
            ) : (<div className={s.row}> {` ${props.file.photoOfUser}`}</div>)}

            <div className={s.rowDate}>{` ${moment(props.file.createdAt).format('DD.MM.YYYY')}`}</div>

            {props.file.status !== undefined && (
                <div className={s.icon}><CreateIcon style={{ height: 20, width: 30, cursor:"pointer" }} onClick={handleClick}/></div>
            )}


            {props.file.status !== undefined && (
                <div><textarea className={s.textbox} id="statusB" name="status" disabled defaultValue={props.file.status}>
                </textarea>
                </div>
            )}

            {props.file.updatedAt !== undefined && (
                <div className={s.rowMdf}>Last modified: {` ${moment(props.file.updatedAt).format('DD.MM.YYYY')}`}</div>
            )}

            {props.file.size !== undefined && (
                <div className={s.row}>Size: {props.file.size || 0}</div>
            )}

            <button className={s.button} id="btnSave" onClick={handleButton} >Save</button>

        </div>
    )

}

export default DetailsPanel;