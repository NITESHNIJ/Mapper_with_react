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
        }, 
        error => {
          this.setState({
            hidden: true,
            errmsg: error.response.data.message
          });
        })
        .catch(error => {
            this.props.history.push('/error')
        });

        event.preventDefault();
    }

    render(){
        return(
          <Container id="forgot_password">
            <h1>Enter your registered Mail ID...</h1>
            <Container id="signup_form_input">
              <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                <Loading />
              </div>
              <div>
                <h2>{this.state.errmsg}</h2>
              </div>
              <Form onSubmit={this.handleForgot}>
                <FormGroup>
                  <Label htmlFor="username">Email</Label>
                  <Input required type="email" id="username" name="username" innerRef={(input) => this.username = input} />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Reset Password</Button>
              </Form>
            </Container>
          </Container>
        );
    }
}

export default ForgotPassword;