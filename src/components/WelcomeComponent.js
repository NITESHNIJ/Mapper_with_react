import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Welcome extends Component{
    render(){
        return(
            <div id="welcome">
                <div className="welcome_jumbo" style={{ height: '90vh', width: '90%', position: 'relative'}}>
                    <div className="content">
                        <h1><b style={{color: "red"}}>DNS</b></h1>
                        <h3 style={{color: "blue"}}>Please Register if you are a new user else Signin</h3>
                        <b onClick={() => {this.props.clickit('/signup')}} style={{color: "blue",cursor: 'pointer'}} class="d-block">Signup</b>OR<b onClick={() => {this.props.clickit('/login/notried')}} style={{color: "blue",cursor: 'pointer'}} class="d-block">Login</b>
                    </div>
                </div>
            </div>
                    
        );
    }
};
export default Welcome;