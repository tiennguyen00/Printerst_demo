import React, { useState, useEffect } from 'react';
import get from 'lodash/get'; //_.get(obj, path, [defaultValue]) lấy giá trị của biết obj tại đường dẫn path
import { useForm } from 'react-hook-form'; //Sử dụng react-hook-form giúp quản lí form dễ hơn
import { getMess } from '../../../util/message';
import { authService } from '../../../services/auth.service';
import { user } from '../../../util/user';
import { Field } from '../../../components/Field/Field';
import { Button } from '../../../components/button/button';
import { patternEmail } from '../../../util/form';
import Grid from '@material-ui/core/Grid';
import { Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash/isEmpty';
import './Verify.scss';

function Verify(props) {
    const { register, handleSubmit, errors } = useForm();
    const history = get(props, 'history', {});
    const stateHistory = history.location.state || {}; //Sẽ lấy giá trị thứ 2 nếu như tham số đầu là falsy

    const [apiError, setApiError] = useState(
        stateHistory.expired ? getMess('M15') : ''
    );
    const [profilePhoto, setProfilePhoto] = useState(''); // Preview profilePhoto
    const [file, setFile] = useState('');

    let userInfo = user.getUserInfo();
    
    //Tương tự componentDidMount
    // eslint-disable-next-line consistent-return
    // React.useEffect(() => {
    //     userInfo = user.getUserInfo();
    //     const unLogin = isEmpty(userInfo);
    //     if (!unLogin) {
    //       if (userInfo.status !== 'defer') return history.push('/');
    //     }
    // }, []);

    const onSubmit = (formState) => {
        setApiError('');

        const { email, firstName, lastName, age } = formState;
  
        let formData  =  new FormData();
        formData.append('profilePhoto', file);
        formData.append('email', email);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('age', age);

        authService.updateRegisterProfile(formData)
            .then(() => history.push(stateHistory.prePath || '/home'))
            .catch((err) => setApiError(err.message));
    }

    const handleLogout = () => {
        authService.logout();
        history.push('/login');
    };

    const onImageChange = async (event) => {
        const file = event.target.files[0];

        //Preview profilePhoto
        if(file){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setProfilePhoto(reader.result);
                }
            }
            reader.readAsDataURL(file);
        }
        //setFile
        setFile(file);
    }

    return (
        <Grid container className="verify">
            <Grid container className="verify-content">
                <Grid item className="verify__paper">
                    <form
                        className="verify__form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Typography variant="body2" className="title">
                                Complete signup below
                            </Typography>
                            <div className="upload-avatar">
                                <img 
                                    src={profilePhoto} 
                                    className="upload-avatar"/>
                                <input
                                    type="file" id="file" accept="image/*" 
                                    onChange={onImageChange}
                                />
                            </div>
                            
                        </Grid>
                        <p className="error-text">{apiError}</p>
                        <Field
                            variant="outlined"
                            label="Email address"
                            name="email"
                            defaultValue={userInfo.email}
                            disabled={true}
                            inputRef={register({
                                required: getMess('M01', 'Email'),
                                pattern: {
                                value: patternEmail,
                                message: getMess('M05'),
                                },
                            })}
                            notRightLabel
                        />
                        <Field
                            helperText={errors.firstName?.message}
                            label="First name"
                            name="firstName"
                            variant="outlined"
                            required
                            inputRef={register({
                                required: getMess('M01', 'firstName'),
                            })}
                            notRightLabel
                        />
                        <Field
                            helperText={errors.lastName?.message}
                            label="Last name"
                            name="lastName"
                            variant="outlined"
                            inputRef={register({
                                required: getMess('M01', 'lastName'),
                            })}
                            required
                            notRightLabel
                        />
                        <Field
                            label="Age"
                            name="age"
                            variant="outlined"
                            type="number"
                            inputRef={register({})}
                            notRightLabel
                        />
            
                        <div className="policy">
                            <Typography variant="body2">
                                By signing up you agree to the Pinterest
                            </Typography>
                            <div className="policy-link">
                                <div className="link">
                                <Link to="">
                                    <p>Terms of User </p>
                                </Link>
                                &nbsp;and&nbsp;
                                <Link to="">
                                    <p> Privacy Policy</p>
                                </Link>
                                </div>
                            </div>
                            <Button
                                text="Continue"
                                type="submit"
                                variant="contained"
                                classes="button-register"     
                            />
                            <Button
                                text="already a user?"
                                variant="contained"
                                classes="button-verify-logout"
                                onClick={handleLogout}          
                            />
                        </div>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export { Verify };