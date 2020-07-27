import React, {Component} from 'react';
import { Container } from 'reactstrap';
import { Col, Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import axios from 'axios';

import { baseUrl } from '../baseUrl';

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

        const base_url = baseUrl;
        axios.post(base_url+'/users/signup',{
          username: this.username.value,
          password: this.password.value,
          name: this.name.value,
          companyname: this.companyname.value,
          usertype: 'admin',
          typeofdatabase: 'shared',
          userpic: 'user pic url',
          companylogo: 'company logo url',
          parentid: 'no parent for admin user'
        })
        .then( response => {
            this.setState({
              hidden: true
            });
            this.props.clickit('/login/true')
        }, (err) => {
          this.setState({
            hidden: true,
            errmsg: err.response.data.message
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
          <Container id="signup_form">
            <Container id="signup_form_input">
              <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                <Loading />
              </div>
              <div>
                <h2>{this.state.errmsg}</h2>
              </div>
              

              <div class="card card-info">
                <div class="card-header">
                  <h3 class="card-title">Signup with us...</h3>
                </div>
                <form onSubmit={this.handleSignup}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="companyname">Company Name</label>
                      <Input required type="text" id="companyname" name="companyname" innerRef={(input) => this.companyname = input}  />
                    </div>
                    <div class="form-group">
                      <label for="name">Admin's Name</label>
                      <Input required type="text" id="name" name="name" innerRef={(input) => this.name = input}  />
                    </div>
                    <div class="form-group">
                      <label for="username">Email</label>
                      <Input required type="email" id="username" name="username" innerRef={(input) => this.username = input} />
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <Input required type="password" id="password" name="password" innerRef={(input) => this.password = input}  />
                    </div>
                    <div class="form-group">
                      <label>Data Base Type</label>
                      <br />
                      <select>
                        <option selected="selected">Shared</option>
                        <option >Individual</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputFile">Admin Picture</label>
                      <div class="input-group">
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" id="exampleInputFile" />
                          <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                        </div>
                        <div class="input-group-append">
                          <span class="input-group-text" id="">Upload</span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputFile2">Compoany Logo</label>
                      <div class="input-group">
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" id="exampleInputFile2" />
                          <label class="custom-file-label" for="exampleInputFile2">Choose file</label>
                        </div>
                        <div class="input-group-append">
                          <span class="input-group-text" id="">Upload</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
              <p><span onClick={() => {this.props.clickit('/login/notried')}} style={{color: "blue",cursor: 'pointer'}} class="d-block">Please <b>Login</b> if you are an existing user...</span></p>
            </Container>
          </Container>
        );
    }
}

export default Signup;