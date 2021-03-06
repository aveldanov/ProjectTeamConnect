import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

// import uuid from 'uuid';
// import { SET_ALERT, REMOVE_ALERT } from '../../actions/types';


// (props) --> destructure --> ({setAlert})
const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // !Same as
  // state = {
  //   formData: {
  //   }
  // }

  //!Same as
  // this.setState({

  // })


  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // console.log('Passwords do not match');

      await setAlert('Passwords do not match', 'danger', 1000)
    } else {
      console.log(formData);
    }
  }

  return <Fragment>
    <h1 className="large text-primary">
      Sign Up
    </h1>
    <p className="lead">
      <i className="fas fa-user"></i>
      Create Your account
    </p>
    <form onSubmit={e => onSubmit(e)} className="form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => onChange(e)}

          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          required
        />
        <small className="form-text">This site uses Gravatar</small>
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
      <div className="form-group">
        <input
          type="password"
          placeholder="Confirm Password" minLength="6"
          name="password2"
          value={password2}
          onChange={e => onChange(e)}
          required
        />
      </div>
      <input
        type="submit"
        value="Register"
        className="btn btn-primary" />
    </form>
    <p className="my-1">Already have an account
       <Link to="/login"> Login</Link>
    </p>
  </Fragment>

}

// props types verification
Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}


// const mapDispatchToProps = dispatch => {
//   const id = uuid.v4();

//   return {
//     setAlert: (msg, alertType) => dispatch(
//       {
//         type: SET_ALERT,
//         payload: { msg, alertType, id }
//       }
//     )
//   }



// }




export default connect(null, { setAlert })(Register);





// // console.log(formData);
      // const newUser = {
      //   name,
      //   email,
      //   password
      // }

      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }
      //   const body = JSON.stringify(newUser);
      //   console.log(body);

      //   const res = await axios.post('api/users', body, config);
      //   console.log(res.data);

      // } catch (err) {
      //   console.error(err.response.data);

      // }
