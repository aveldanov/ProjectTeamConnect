import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [formData, setFormData] = useState({

    email: '',
    password: ''
  });



  const { email, password } = formData;

  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const user = {
    email,
    password
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);


  }

  return <Fragment>
    <h1 className="large text-primary">
      Login
    </h1>
    <p className="lead">
      <i className="fas fa-user"></i>
      Login to Your account
    </p>
    <form onSubmit={e => onSubmit(e)} className="form">

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          required
        />

      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          minLength="6"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          required
        />
      </div>

      <input
        type="submit"
        value="Login"
        className="btn btn-primary" />
    </form>
    <p className="my-1">Don't have an account
       <Link to="/register"> Sign Up</Link>
    </p>
  </Fragment>

}

export default Login;




