import React, { useState, useEffect } from 'react'
import { userService } from '../../services/user.service'
import { user } from '../../util/user';
import { getMess } from '../../util/message';
import get from 'lodash/get';
import './Profile.scss';

function Profile(props) {
    const [userProfile, setUserProfile] = useState({});

    const history = get(props, 'history', {});
    const stateHistory = history.location.state || {};
    const [apiError, setApiError] = useState(
        stateHistory.expired ? getMess('M15') : ''
      );
    

    useEffect( async () => {
        userService.getProfile()
          .then((res) => {
            setUserProfile(res);
          })
          .catch(err => {
            if(err === 400)
                setApiError("Load fail!!!");
            else
                setApiError(err.message);
          })
    }, []);

    return (
        <div className="">
             <p>{apiError}</p>
             <h1>Email: {userProfile.email}</h1>
             <h1>Name: {userProfile.firstName}</h1>
             <h1>Photo: {userProfile.profilePhoto}</h1>
             <img src={userProfile.profilePhoto} alt="Not permission"/>
        </div>
    )
}

export { Profile }
