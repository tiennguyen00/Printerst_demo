import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMessage } from '../../redux/message/messageActions';
import Snackbar from '../../UI/Snackbar';

const getMessage = state => state.messageReducer;

export default function Message(props) {
    const dispatch = useDispatch();
    const message = useSelector(getMessage);
  
    return (
      <Snackbar
        message={message.content}
        onClose={() => dispatch(setMessage())}
        type={message.type}
        {...props}
      />
    );
}