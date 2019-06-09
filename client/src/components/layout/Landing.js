import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Porject Team Connect</h1>
          <p className="lead">
            Create profile/portfolio, share posts and get help from your team
        </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Register</Link>

            <Link to="/login" className="btn btn">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
