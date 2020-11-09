import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from "./style";
import { login } from '../../utils/login';

export default function Login(props) {
  const classes = useStyles();
  const [emailId, setemailId] = useState();
  const [password, setpassword] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailId: emailId, password: password })
    };
    fetch('http://localhost:4000/api/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          login(data.token);
          props.history.push('/dashboard');

        }
        else { console.log(data) }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>   <LockOutlinedIcon /> </Avatar>
        <Typography component="h1" variant="h5">   Sign in </Typography>
        <form className={classes.form} noValidate>
          <TextField value={emailId} onChange={e => setemailId(e.target.value)} variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="emailId" autoFocus />
          <TextField value={password} onChange={e => setpassword(e.target.value)} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit} >    Sign In  </Button>
          <Grid container>
            <Grid item xs>  <Link href="#" variant="body2">    Forgot password?  </Link></Grid>
            <Grid item>    <Link href="#" variant="body2">      {"Don't have an account? Sign Up"}    </Link>  </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}