import React, {Component} from 'react';
import { Container } from 'reactstrap';
import { Col, Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import axios from 'axios';

import { baseUrl } from '../baseUrl';
class AddUser extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            hidden: true,
            errmsg: ""
        };
        this.handleUser = this.handleUser.bind(this);
    }

    handleUser(event) {
        this.setState({
          hidden: false
        });

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const base_url = baseUrl;
        axios.post(base_url+'/users/localuser/signup',{
            username: this.username.value,
            password: this.password.value,
            name: this.name.value,
            usertype: 'localuser',
            userpic: 'local user pic url'
        },{
            headers: headers
        })
        .then( response => {
          console.log(response.data.message);
          this.setState({
            hidden: true,
            errmsg: response.data.message
          });
          this.username.value = '';
          this.password.value = '';
          this.name.value = '';
        }, 
        error => {
          this.setState({
            hidden: true,
            errmsg: error.response.data.message
          });
          alert("Session Expired");
          this.props.clickit('/logout');
        })
        .catch(error => {
            this.setState({
                hidden: true,
                errmsg: error.response.data.message
            });
            alert("Session Expired");
            this.props.clickit('/logout');
        });

        //alert("Username: " + this.username.value + " Password: " + this.password.value);
        event.preventDefault();
    }

    render(){
        return(
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">Add User</h1>
                                <h3>{this.state.errmsg}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                    <Loading />
                </div>

                <section class="content">
                    <div class="container-fluid">
                        
                    <div class="card card-warning">
                        <div class="card-header">
                            <h3 class="card-title">Add a Local User to your Company...</h3>
                        </div>
                        <form onSubmit={this.handleUser}>
                            <div class="card-body">
                            
                            <div class="form-group">
                                <label for="name">Local User's Name</label>
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
                                <label for="exampleInputFile2">User's Picture</label>
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
                    </div>
                </section>
            </div>
        );
    }
}

export default AddUser;