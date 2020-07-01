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
              <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
            </li>
          </ul>
        </nav>

        <aside class="main-sidebar sidebar-dark-primary elevation-4">
          <a href="/dashboard" class="brand-link">
            <img src={imageUrl1} alt="" class="brand-image img-circle elevation-3"
                style={{opacity: ".8"}} />
            <span class="brand-text font-weight-light">Company Name</span>
          </a>

          <div class="sidebar">
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
              <div class="image">
                <img src={imageUrl2} class="img-circle elevation-2" alt="" />
              </div>
              <div class="info">
                <a href="#" class="d-block">Admin Name</a>
              </div>
            </div>

            <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                  <a href="/dashboard" class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Dashboard
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/add_data" class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Add Data
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/map" class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      View Map
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/create_alert" class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Create Alert
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/add_location" class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Add Location
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/create_sensor" class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Create Sensor
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/add_sensor" class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Add Sensor
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/add_user" class="nav-link">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                      Add User
                    </p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/logout" class="nav-link">
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