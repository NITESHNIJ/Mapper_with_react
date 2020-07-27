import React, {Component} from 'react';
import { Loading } from './LoadingComponent'
import { Container } from 'reactstrap';
import { Col, Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

import { baseUrl } from '../baseUrl';

class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            hidden: true,
            errmsg: "",
            key: props.match
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        this.setState({
            hidden: false
        });
        // alert(this.username.value);

        const base_url = baseUrl;
        axios.post(base_url+'/resetpassword',{
          username: this.username.value,
          password: this.password.value,
          key: this.state.key
        })
        .then( response => {
          this.setState({
            hidden: true,
            errmsg: response.data.message
          });
          this.props.clickit('/login')
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
                  <p class="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
                  <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                    <Loading />
                  </div>
                  <div>
                    <h2>{this.state.errmsg}</h2>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div class="input-group mb-3">
                      <Input required type="email" id="username" name="username" innerRef={(input) => this.username = input} />
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <span class="fas fa-lock"></span>
                        </div>
                      </div>
                    </div>
                    <div class="input-group mb-3">
                      <Input required type="password" id="password" name="password" innerRef={(input) => this.password = input} />
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <span class="fas fa-lock"></span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">Change password</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default ResetPassword;