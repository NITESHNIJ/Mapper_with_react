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
              //this.props.history.push('./dashboard');
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
          this.props.history.push('/error')
        });

        //alert("Username: " + this.username.value + " Password: " + this.password.value);
        event.preventDefault();
    }

    render(){
        return(
          <Container id="signup_form">
            <h1>Login...</h1>
            <Container id="signup_form_input">
              <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                <Loading />
              </div>
              <div>
                <h3>{this.state.signup_status}</h3>
              </div>
              <div>
                <h3>{this.state.errmsg}</h3>
              </div>
              <Form onSubmit={this.handleLogin}>
                  <FormGroup>
                    <Label htmlFor="username">Email</Label>
                    <Input required type="email" id="username" name="username" innerRef={(input) => this.username = input} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input required type="password" id="password" name="password" innerRef={(input) => this.password = input}  />
                  </FormGroup>
                  <Button type="submit" value="submit" color="primary">Login</Button>
                </Form>
                <p>Please <Link to="/signup"><b>Signup</b></Link> if you are a new user...</p>
                <p><Link to="/forgot_password"><b>Forgot Password?</b></Link></p>
                
            </Container>
          </Container>
        );
    }
}

export default Login;