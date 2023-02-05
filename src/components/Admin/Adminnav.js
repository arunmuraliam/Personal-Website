import React, { Component } from 'react'
import { Link } from "react-router-dom";



export class Adminnav extends Component {
  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./adminlogin"
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <a className="navbar-brand" href="/admin">Admin</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className='nav-link' to="/">Home</Link>
              </li>
              <li>

              </li>
              <li className="nav-item">
                <Link className='nav-link' to="/profile">My Profile</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to="">Edit password</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to="/updateimage">Change profile picture</Link>
              </li>
              <li className='nav-item' >
                 <a className='nav-link' onClick={this.logOut} style={{cursor:'pointer'}}>Logout</a>
              </li>

            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Adminnav