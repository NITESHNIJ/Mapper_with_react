import React, {Component} from 'react';
import { Loading } from './LoadingComponent'
import { Container } from 'reactstrap';
import { Col, Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            hidden: true,
            errmsg: "",
            key: props.match.params.key
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        this.setState({
            hidden: false
        });
        // alert(this.username.value);

        const base_url = 'http://localhost:8000';
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
            <h1>Reset Password</h1>
            <Container id="signup_form_input">
              <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                <Loading />
              </div>
              <div>
                <h2>{this.state.errmsg}</h2>
              </div>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label htmlFor="username">Email</Label>
                  <Input required type="email" id="username" name="username" innerRef={(input) => this.username = input} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">New Password</Label>
                  <Input required type="password" id="password" name="password" innerRef={(input) => this.password = input} />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Save Password</Button>
              </Form>
            </Container>
          </Container>
        );
    }
}

export default ResetPassword;