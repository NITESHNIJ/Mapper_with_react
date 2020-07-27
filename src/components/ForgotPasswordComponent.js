import React, { Component } from 'react';
import { Loading } from './LoadingComponent'
import { Container } from 'reactstrap';
import { Col, Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

import { baseUrl } from '../baseUrl';

class ForgotPassword extends Component{
    constructor(props){
        super(props);

        this.state = {
            hidden: true,
            errmsg: ""
        };
        this.handleForgot = this.handleForgot.bind(this);
    }

    handleForgot(event){
        this.setState({
            hidden: false
        });
        //alert(this.username.value);

        const base_url = baseUrl;
        axios.post(base_url+'/forgotpassword',{
          username: this.username.value
        })
        .then( response => {
          this.setState({
            hidden: true,
            errmsg: response.data.message
          });
          this.username.value = '';
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

        event.preventDefault();
    }

    render(){
        return(
          <div class="hold-transition login-page">
            <div class="login-box">
              <div class="card">
                <div class="card-body login-card-body">
                  <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
                  <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                    <Loading />
                  </div>
                  <div>
                    <h2>{this.state.errmsg}</h2>
                  </div>
                  <form onSubmit={this.handleForgot}>
                    <div class="input-group mb-3">
                      <Input required type="email" id="username" name="username" innerRef={(input) => this.username = input} />
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <span class="fas fa-envelope"></span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">Request new password</button>
                      </div>
                    </div>
                  </form>

                  <p class="mt-3 mb-1">
                    <span onClick={() => {this.props.clickit('/login/notried')}} style={{color: "blue",cursor: 'pointer'}} class="d-block"><b>Login</b></span>
                  </p>
                  <p class="mb-0">
                    <span onClick={() => {this.props.clickit('/signup')}} style={{color: "blue",cursor: 'pointer'}} class="d-block"><b>Signup as new User</b></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default ForgotPassword;