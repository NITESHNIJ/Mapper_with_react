import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Welcome from './WelcomeComponent';
import Header from './HeaderComponent';
import Signup from './SignupComponent';
import Login from './LoginComponent';
import ErrorHandle from './ErrorComponent';
import ForgotPassword from './ForgotPasswordComponent';
import ResetPassword from './ResetPasswordComponent';

class Main extends Component{

    render(){
        
        if(localStorage.getItem('token')){
            return(
                <div className="App">
                    <div>Add a lot more here!</div>
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