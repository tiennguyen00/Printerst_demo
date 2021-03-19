import React, { useState, useEffect } from 'react';
import get from 'lodash/get'; //_.get(obj, path, [defaultValue]) lấy giá trị của biết obj tại đường dẫn path
import { useForm } from 'react-hook-form'; //Sử dụng react-hook-form giúp quản lí form dễ hơn
import { getMess } from '../../../util/message';
import { user } from '../../../util/user';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import { isEmpty } from 'lodash/isEmpty';

function Verify(props) {
    const { register, handleSubmit, errors } = useForm();
    const history = get(props, 'history', {});
    const stateHistory = history.location.state || {}; //Sẽ lấy giá trị thứ 2 nếu như tham số đầu là falsy

    const [apiError, setApiError] = useState(
        stateHistory.expired ? getMess('M15') : ''
    );

    let userInfo = user.getUserInfo();
    
    //Tương tự componentDidMount, 
    React.useEffect(() => {
        userInfo = user.getUserInfo();
        const unLogin = isEmpty(userInfo);
        if (!unLogin) {
          if (userInfo.status !== 'defer') return history.push('/');
        }
    }, []);

    return (
        <div>
            This is a Verify.
        </div>
    )
}

export { Verify };