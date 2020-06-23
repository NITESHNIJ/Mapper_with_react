import React, {Component} from 'react';
import { Container } from 'reactstrap';
import { Col, Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import axios from 'axios';


class Signup extends Component{


    constructor(props){
        super(props);
        this.state = {
          hidden: true
        };
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup(event) {
        this.setState({
          hidden: false,
          errmsg: ""
        });

        const base_url = 'http://localhost:8000';
        axios.post(base_url+'/users/signup',{
          username: this.username.value,
          password: this.password.value
        })
        .then( response => {
            this.setState({
              hidden: true
            });
            this.props.history.push('/login/true')
        }, (err) => {
          this.setState({
            hidden: true,
            errmsg: err.response.data.message
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
            <h1>Signup with us...</h1>
            <Container id="signup_form_input">
              <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                <Loading />
              </div>
              <div>
                <h2>{this.state.errmsg}</h2>
              </div>
              <Form onSubmit={this.handleSignup}>
                <FormGroup>
                  <Label htmlFor="username">Email</Label>
                  <Input required type="email" id="username" name="username" innerRef={(input) => this.username = input} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input required type="password" id="password" name="password" innerRef={(input) => this.password = input}  />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Signup</Button>
              </Form>
              Please <Link to="/login/notried"><b>Login</b></Link> if you are an existing user...
            </Container>
          </Container>
        );
    }
}

export default Signup;