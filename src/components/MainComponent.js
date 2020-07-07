import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

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
import { fillstore, emptystore } from '../redux/ActionCreators';

// extra stuff
import axios from "axios";
import { baseUrl } from '../baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state,{history}) => {
    return{
       store: state
    }
}

const mapDispatchToProps = (dispatch) => ({
    fillstore : (token, message, name, companyname,usertype, typeofdatabase, userpic, companylogo, parentid) => dispatch(fillstore(token, message, name, companyname,usertype, typeofdatabase, userpic, companylogo, parentid)),
    emptystore : () => dispatch(emptystore())
  });

class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            hidden: true
        };
        this.pusher = this.pusher.bind(this);
    }

    pusher(loc){
        this.props.history.push(loc);
    }

    componentWillMount(){
    
        if(localStorage.getItem('token') && this.props.store.name==''){
            //alert("if inside componentWillMount Entered");
            this.setState({
                hidden: false
            });
            let base_url = baseUrl;
            axios.get(base_url+'/users/detail', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then( response => {
                this.props.fillstore(response.data.token, response.data.message, response.data.name, response.data.companyname, response.data.usertype, response.data.typeofdatabase, response.data.userpic, response.data.companylogo, response.data.parentid);
                this.setState({
                    hidden: true
                });
            }, 
            error => {
                console.log("error of componentdidMount");
                localStorage.removeItem('token');
                this.props.emptystore();
                this.setState({
                    hidden: true
                });
            })
            .catch(error => {
                localStorage.removeItem('token');
                this.props.emptystore();
                this.setState({
                    hidden: true
                });
            });
        }
    }

    render(){
        
        if(this.state.hidden == false){
            return(
                <Loading />
            );
        }
            

        if(localStorage.getItem('token')){
            if(this.props.store.usertype == 'admin'){
                return(
                    <div className="hold-transition sidebar-mini layout-fixed">
                        <div class="wrapper">
                            <Header clickit={(loc) => this.pusher(loc)} companyname={this.props.store.companyname} name={this.props.store.name} companylogo={this.props.store.companylogo} userpic={this.props.store.userpic}/>
                            <Switch>
                                <Route path="/logout" component={() => <Logout clickit={(loc) => this.pusher(loc)} emptystore={this.props.emptystore}/>} />
                                <Route path="/dashboard" component={() => <Dashboard clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/add_data" component={() => <AddData clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/map" component={() => <Map clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/create_alert" component={() => <CreateAlert clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/add_location" component={() => <AddLocation clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/create_sensor" component={() => <CreateSensor clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/add_sensor" component={() => <AddSensor clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/add_user" component={() => <AddUser clickit={(loc) => this.pusher(loc)} />} />
                                <Redirect to="/dashboard" />
                            </Switch>
                            <Footer />
                        </div>
                    </div>
                    
                );
            }
            else{
                return(
                    <div className="hold-transition sidebar-mini layout-fixed">
                        <div class="wrapper">
                            <Header clickit={(loc) => this.pusher(loc)} companyname={this.props.store.companyname} name={this.props.store.name} companylogo={this.props.store.companylogo} userpic={this.props.store.userpic}/>
                            <Switch>
                                <Route path="/logout" component={() => <Logout clickit={(loc) => this.pusher(loc)} emptystore={this.props.emptystore}/>} />
                                <Route path="/dashboard" component={() => <Dashboard clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/add_data" component={() => <AddData clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/map" component={() => <Map clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/create_alert" component={() => <CreateAlert clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/add_location" component={() => <AddLocation clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/create_sensor" component={() => <CreateSensor clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/add_sensor" component={() => <AddSensor clickit={(loc) => this.pusher(loc)} />} />
                                <Route path="/add_user" component={() => <AddUser clickit={(loc) => this.pusher(loc)} />} />
                                <Redirect to="/dashboard" />
                            </Switch>
                            <Footer />
                        </div>
                    </div>
                    
                );
            }
        }
        else{

            const LoginComp = (props)=>{
                return(
                    <Login fillstore={this.props.fillstore} match={props.match.params.signed} clickit={(loc) => this.pusher(loc)}/>
                );
            }

            return(
                <div className="App">
                    <Switch>
                        <Route path="/welcome" component={Welcome} />
                        <Route path="/login/:signed" component={LoginComp} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));