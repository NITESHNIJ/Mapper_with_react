import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Welcome extends Component{
    render(){
        return(
            <div id="welcome">
                <div className="welcome_jumbo" style={{ height: '90vh', width: '90%', position: 'relative'}}>
                    <div className="content">
                        <h1><b>Welcome</b></h1>
                        <h3>Please Register if you are a new user else Signin</h3>
                        <Link to="/signup"><b>Login/Signup</b></Link>
                    </div>
                </div>
            </div>
                    
        );
    }
};
//style="width: 100%; height: 100vh; position: relative;"
export default Welcome;