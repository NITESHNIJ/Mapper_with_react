import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import Welcome from './WelcomeComponent';
import Header from './HeaderComponent';
import Signup from './SignupComponent';
import Login from './LoginComponent';
import ErrorHandle from './ErrorComponent';
import ForgotPassword from './ForgotPasswordComponent';
import ResetPassword from './ResetPasswordComponent';

class Main extends Component{

    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        localStorage.removeItem('token');
        window.location.reload(false)
        //this.props.history.push('/');
    }

    render(){
        
        if(localStorage.getItem('token')){
            return(
                <div className="App">
                    <h2>Home page</h2>
                    <div>Here the user will get all the options!</div>
                    <Button variant="primary" size="sm" onClick={()=> this.logout()}>Logout</Button>
                </div>
            );
        }
        else{

            return(
                <div className="App">
                    <Switch>
                        <Route path="/welcome" component={Welcome} />
                        <Route path="/login/:signed" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/error" component={ErrorHandle} />
                        <Route path="/forgot_password" component={ForgotPassword} />
                        <Route path="/reset_password/:key" component={ResetPassword} />
                        <Redirect to="/welcome" />
                    </Switch>
                </div>
            );
        }
    }

}

export default Main;