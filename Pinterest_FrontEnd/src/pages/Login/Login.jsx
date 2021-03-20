import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import get from 'lodash/get'; //get(obj, path, [defaultValue])
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { authService } from '../../services/auth.service'; //Các mothod liên quan đến gọi api ở backend
import { Button } from '../../components/button/button'; 
import { getMess } from '../../util/message'; //Liên quan đến các messenger thông báo
import { patternEmail } from '../../util/form'; //Liên quan về phần vidation mail
import { Field } from '../../components/Field/Field';
import { user } from '../../util/user'; //
import logo from '../../assets/image/logo.JPG'; //logo
import './Login.scss';

function Login(props) {
    const { register, handleSubmit, errors } = useForm();
    const history = get(props, 'history', {});
    const stateHistory = history.location.state || {};

    const [apiError, setApiError] = useState(
        stateHistory.expired ? getMess('M15') : ''
    );

    //Tương tự componentDidMount
    useEffect(() => {
        const userInfo = user.getUserInfo();
        const unLogin = isEmpty(userInfo);
        if (!unLogin) {
          if (userInfo.status === 'defer') return history.push('/verify');
          return history.push('/');
        }
    }, []);

    const onSubmit = formState => {
        setApiError('');
        console.log('FormState: ', formState);
    
        authService
          .login(formState)
          .then(res => {
            user.saveUserStorage(res.token);
            return history.push(stateHistory.prePath || '/');
          })
          .catch(err => {
            const requiredNewPassCode = 401;
    
            if (err.code === requiredNewPassCode) {
              return history.push(`/change-password/${formState.email}`);
            }
    
            return setApiError(err.message);
          });
    };

    return(
        <Grid container className="login">
            <Grid container className="login-content">
                <Grid item className="login__paper">
                    <form
                        className="login__form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <img src={logo} className="logo"></img>
                            <Typography variant="h5" gutterBottom>
                                Welcome Back!
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                ""
                            </Typography>
                        </Grid>
                        <p className="error-text">{apiError}</p>
                        <Field
                            helperText={errors.email?.message}
                            variant="outlined"
                            label="Email address"
                            name="email"
                            required
                            inputRef={register({
                                required: getMess('M01', 'Email address'),
                                pattern: {
                                value: patternEmail,
                                message: getMess('M05'),
                                },
                            })}
                            notRightLabel
                        />

                        <Field
                            helperText={errors.password?.message}
                            label="Password"
                            type="password"
                            name="password"
                            variant="outlined"
                            required
                            inputRef={register({
                                required: getMess('M01', 'Password'),
                            })}
                            notRightLabel
                        />
                        <Link className="forgot-password-link" to="/forgot-password">
                            <p>Forgot password?</p>
                        </Link>
                        <Button
                            text="Continue"
                            type="submit"
                            color="primary"
                            variant="contained"
                            classes="button-login"
                            disableElevation
                        />
                        <div className="register-link">
                            Don&apos;t have an account?&nbsp;
                            <Link to="/register">
                                <p>Sign up</p>
                            </Link>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
}


export { Login };