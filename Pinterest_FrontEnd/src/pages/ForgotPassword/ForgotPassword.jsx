import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { Button } from '../../components/button/button';
import { getMess } from '../../util/message';
import { patternEmail } from '../../util/form';
import { Field } from '../../components/Field/Field';
import { user } from '../../util/user';
import logoLogin from '../../assets/image/logo.JPG';
import './ForgotPassword.scss';

function ForgotPassword(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = get(props, 'history', {});
  const stateHistory = history.location.state || {};

  const [apiError, setApiError] = useState(
    stateHistory.expired ? getMess('M15') : '' // Kiếm tra session timeout chưa
  );
  const [resultPassword, setResultPassword] = useState('');

  const onSubmit = formState => {
    setApiError('');
    authService.forgotPassword(formState)
        .then(res => {
            // user.saveUserStorage(res.token);
            return setResultPassword(res.message)
            // return history.push(stateHistory.prePath || '/login');
        })
        .catch(err => {
            const requiredNewPassCode = 401;

            if (err.code === requiredNewPassCode) {
                return history.push(`/change-password/${formState.email}`);
            }

            return setApiError(err.message);
        });
  }



  return (
    <Grid container className="forgot-password">
      <Grid container className="forgot-password-content">
        <Grid item className="forgot-password__paper">
          <form
            className="forgot-password__form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <img src={logoLogin} className="forgot-password__logo"></img>
              <Typography variant="h5" gutterBottom>
                Forgot Your Password?
              </Typography>
              <Typography className variant="body2" gutterBottom>
                Enter your email address and we will send your password
              </Typography>
            </Grid>
            <p className="error-text">{apiError}</p>
            <p className="password-text">{resultPassword}</p>
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
            <Button
              text="Continue"
              type="submit"
              variant="contained"
              classes="button-login"
              disableElevation
            />
            <Link className="back-to-login-link" to="/login">
              <p>Back to Pinterest Web</p>
            </Link>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { ForgotPassword };
