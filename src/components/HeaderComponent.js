import React, { Component } from 'react';
import imageUrl1 from "../images/add_data.jpg";
import imageUrl2 from "../images/map.jpg";

import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button,
  Form} from 'reactstrap';

import { NavLink } from 'react-router-dom';

class Header extends Component {

  constructor(props){
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout(){
    localStorage.removeItem('token');
    this.props.history.push('/')
  }

  render() {
    return(
      <React.Fragment>
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#">
                <i class="fas fa-bars"></i>
              </a>
            </li>
          </ul>
        </nav>

        <aside class="main-sidebar sidebar-dark-primary elevation-4">
          <a onClick={() => {this.props.clickit('/dashboard')}} class="brand-link">
            <img src={imageUrl1} alt="" class="brand-image img-circle elevation-3"
                style={{opacity: ".8"}} />
            <span class="brand-text font-weight-light" style={{color: 'white',cursor:'pointer'}}>{this.props.companyname}</span>
          </a>

          <div class="sidebar">
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
              <div class="image">
                <img src={imageUrl2} class="img-circle elevation-2" alt="" />
              </div>
              <div class="info">
                <a onClick={() => {this.props.clickit('/')}} class="d-block">{this.props.name}</a>
              </div>
            </div>

            <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                  <a onClick={() => {this.props.clickit('/dashboard')}} style={{color: 'white',cursor:'pointer'}} class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Dashboard
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a onClick={() => {this.props.clickit('/view_code')}} style={{color: 'white',cursor:'pointer'}} class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      View Code
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a onClick={() => {this.props.clickit('/map')}} style={{color: 'white',cursor:'pointer'}} class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      View Map
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a onClick={() => {this.props.clickit('/create_alert')}} style={{color: 'white',cursor:'pointer'}} class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Create Alert
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a onClick={() => {this.props.clickit('/add_location')}} style={{color: 'white',cursor:'pointer'}} class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Add Location
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a onClick={() => {this.props.clickit('/create_sensor')}} style={{color: 'white',cursor:'pointer'}} class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Create Sensor
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a onClick={() => {this.props.clickit('/add_sensor')}} style={{color: 'white',cursor:'pointer'}} class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Add Sensor
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a onClick={() => {this.props.clickit('/add_user')}} style={{color: 'white',cursor:'pointer'}} class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Add User
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a onClick={() => {this.props.clickit('/logout')}} style={{color: 'white',cursor:'pointer'}} class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Logout
                    </p>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </React.Fragment>
    );
  }
}


export default Header;