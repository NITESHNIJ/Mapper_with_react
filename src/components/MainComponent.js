import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

// for logged in user
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Logout from './LogoutComponent';

import Dashboard from './DashboardComponent';
import AddData from './AddDataComponent';
import Map from './MapComponent';
import CreateAlert from './CreateAlertComponent';
import AddLocation from './AddLocationComponent';
import CreateSensor from './CreateSensorComponent';
import AddSensor from './AddSensorComponent';
import AddUser from './AddUserComponent';

// for non-login user
import Welcome from './WelcomeComponent';
import Signup from './SignupComponent';
import Login from './LoginComponent';
import ErrorHandle from './ErrorComponent';
import ForgotPassword from './ForgotPasswordComponent';
import ResetPassword from './ResetPasswordComponent';

class Main extends Component{

    constructor(props){
        super(props);
    }

    render(){
        
        if(localStorage.getItem('token')){
            return(
                <div className="hold-transition sidebar-mini layout-fixed">
                    <div class="wrapper">
                        <Header />
                        <Switch>
                            <Route path="/logout" component={ Logout } />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/add_data" component={AddData} />
                            <Route path="/map" component={Map} />
                            <Route path="/create_alert" component={CreateAlert} />
                            <Route path="/add_location" component={AddLocation} />
                            <Route path="/create_sensor" component={CreateSensor} />
                            <Route path="/add_sensor" component={AddSensor} />
                            <Route path="/add_user" component={AddUser} />
                            <Redirect to="/dashboard" />
                        </Switch>
                        <Footer />
                    </div>
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