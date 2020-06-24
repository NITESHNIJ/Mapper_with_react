import React, {Component} from 'react';
import { Container } from 'reactstrap';
import { Col, Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import axios from "axios";


class Login extends Component{


    constructor(props){
        super(props);
        this.state = {
          hidden: true,
          signup_status: "",
          errmsg: ""
        };

        this.handleLogin = this.handleLogin.bind(this);

        if(props.match.params.signed == 'true'){
          this.state.signup_status = "You have succesfully signed up!"
        }

        //alert(props.match.params.signed);
    }

    handleLogin(event) {
        this.setState({
          hidden: false
        });

        const base_url = 'http://localhost:8000';
        axios.post(base_url+'/users/login',{
          username: this.username.value,
          password: this.password.value
        })
        .then( response => {
          //console.log(response);
          this.setState({
            hidden: true
          });
          localStorage.setItem('token', response.data.token);
          this.props.history.push('/dashboard')
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
                <p><Link to="/forgot_password"><b>Forgot Password?</b></Link>, don't worry we will help you!</p>
            </Container>
          </Container>
        );
    }
}

export default Login;