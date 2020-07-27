import React, {Component} from 'react';
import { Container } from 'reactstrap';
import { Col, Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import axios from "axios";
//import { browserHistory } from 'react-router';

import { baseUrl } from '../baseUrl';

class Login extends Component{

    
    constructor(props){
        super(props);
        this.state = {
          hidden: true,
          signup_status: "",
          errmsg: ""
        };

        this.handleLogin = this.handleLogin.bind(this);

        if(props.match == 'true'){
          this.state.signup_status = "You have succesfully signed up!"
        }

        //alert(props.match.params.signed);
    }

    handleLogin(event) {

        this.setState({
          hidden: false
        });

        const base_url = baseUrl;
        axios.post(base_url+'/users/login',{
          username: this.username.value,
          password: this.password.value
        })
        .then( response => {

          localStorage.setItem('token', response.data.token);

          axios.get(base_url+'/users/detail', {
              headers: {
                  Authorization: 'Bearer ' + response.data.token
              }
          })
          .then( response => {
              this.props.fillstore(response.data.token, response.data.message, response.data.name, response.data.companyname, response.data.usertype, response.data.typeofdatabase, response.data.userpic, response.data.companylogo, response.data.parentid);
              
              this.setState({
                hidden: true
              });
              this.props.clickit('/dashboard');
          }, 
          error => {
              console.log("error of componentdidMount");
              localStorage.removeItem('token');

              this.props.clickit('/login/failed');
          })
          .catch(error => {
              localStorage.removeItem('token');
              this.props.clickit('/login/failed');
              console.log(error);
          });       

        }, 
        error => {
          this.setState({
            hidden: true,
            errmsg: error.response.data.message
          });
        })
        .catch(error => {
          this.props.clickit('/error')
        });

        //alert("Username: " + this.username.value + " Password: " + this.password.value);
        event.preventDefault();
    }

    render(){
        return(
          <div class="hold-transition login-page">
            <div class="login-box">
              <div class="card">
                <div class="card-body login-card-body">
                  <p class="login-box-msg">Sign in to start your session</p>
                  <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                    <Loading />
                  </div>
                  <div>
                    <h3>{this.state.signup_status}</h3>
                  </div>
                  <div>
                    <h3>{this.state.errmsg}</h3>
                  </div>
                  <form onSubmit={this.handleLogin}>
                    <div class="input-group mb-3">
                      <Input required type="email" id="username" name="username" innerRef={(input) => this.username = input} />
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <span class="fas fa-envelope"></span>
                        </div>
                      </div>
                    </div>
                    <div class="input-group mb-3">
                      <Input required type="password" id="password" name="password" innerRef={(input) => this.password = input}  />
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <span class="fas fa-lock"></span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                      </div>
                    </div>
                  </form>

                  <p class="mb-1">
                    <p><span onClick={() => {this.props.clickit('/signup')}} style={{color: "blue",cursor: 'pointer'}} class="d-block">Please <b>Signup</b> if you are a new user...</span></p>
                  </p>
                  <p class="mb-0">
                    <p><span onClick={() => {this.props.clickit('/forgot_password')}} style={{color: "blue",cursor: 'pointer'}} class="d-block">Forgot Password?</span></p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Login;