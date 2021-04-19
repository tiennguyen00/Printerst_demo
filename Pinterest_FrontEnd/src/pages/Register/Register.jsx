import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { authService } from '../../services/auth.service';
import { Button } from '../../components/button/button';
import { patternEmail } from '../../util/form';
import { getMess } from '../../util/message';
import { Field } from '../../components/Field/Field';
import { user } from '../../util/user';
import logoLogin from '../../assets/image/pinterest_PNG40.png';
import './Register.scss';


function Register(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = get(props, 'history', {});
  const stateHistory = history.location.state || {};

  const [apiError, setApiError] = useState(
    stateHistory.expired ? getMess('M15') : ''
  );

  // eslint-disable-next-line consistent-return
  //Tương tự componentDidMount.
  React.useEffect(() => {
    const userInfo = user.getUserInfo();
    const unLogin = isEmpty(userInfo);
    if (!unLogin) {
      if (userInfo.status === 'defer') return history.push('/verify');
      return history.push('/');
    }
  }, []);

  const onSubmit = formState => {
    authService.register(formState)
      .then(() => {
        authService
          .login(formState)
          .then(res => {
            user.saveUserStorage(res.token);
            return history.push('/verify', formState);
          })
          .catch(err => {
            const requiredNewPassword = 401;

            if (err.code === requiredNewPassword) {
              return history.push(`/change-password/${formState.email}`);
            }

            return setApiError(err.message);
          })
      }).catch(err => {
        if (err.code === 400) {
          setApiError('That email address is already registered!!');
        }
        else if(err.code === 405){
          setApiError('These passwords do not match!!');
        }
      });
  };

  return (
    <Grid container className="register">
      <Grid container className="register-content">
        <Grid item className="register__paper">
          <form
            className="register__form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <img src={logoLogin} className="logo"></img>
              <Typography variant="h5" gutterBottom>
                Create Your Account!
              </Typography>
              <Typography variant="body2" gutterBottom>
                No credit card required
              </Typography>
            </Grid>
            <p className="error-text">{apiError}</p>
            <Field
              helperText={errors.email?.message}
              variant="outlined"
              label="Email address"
              name="email"
              notRightLabel
              required
              inputRef={register({
                required: getMess('M01', 'Email address'),
                pattern: {
                  value: patternEmail,
                  message: getMess('M05'),
                },
              })}
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

            <Field
              helperText={errors.password?.message}
              label="Confirm password"
              type="password"
              name="confirmPassword"
              variant="outlined"
              required
              inputRef={register({
                required: getMess('M01', 'Password'),
              })}
              notRightLabel
            />
            <Button
              text="Continue"
              type="submit"
              variant="contained"
              classes="button-register"
              disableElevation
            />
            <div className="log-in-link" >
              <div>
                Already have an account?&nbsp;
                <Link to="/login">
                  <p>Log in</p>
                </Link>
              </div>
            </div>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { Register };
