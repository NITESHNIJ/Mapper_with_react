import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';

import imageUrl1 from "../images/add_data.jpg";
import imageUrl2 from "../images/map.jpg";
import imageUrl3 from "../images/alert.png";
import imageUrl4 from "../images/location.png";
import imageUrl5 from "../images/sensor.jpg";
import imageUrl6 from "../images/sensoradd.png";
import imageUrl7 from "../images/useradd.png";

import { baseUrl } from '../baseUrl';

class Dashboard extends Component{
    render(){
        return(
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-3 col-6">
                                <div class="card" >
                                <img class="card-img-top" src={imageUrl1} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Add Data</h5>
                                    <p class="card-text">Add new data point.</p>
                                    <a href="/add_data" class="btn btn-primary">Add Data</a>
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6">
                                <div class="card" >
                                <img class="card-img-top" src={imageUrl2} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Show Map</h5>
                                    <p class="card-text">View your added data points.</p>
                                    <a href="/map" class="btn btn-primary">View Map</a>
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6">
                                <div class="card" >
                                <img class="card-img-top" src={imageUrl3} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Create Alert</h5>
                                    <p class="card-text">Create an alert!</p>
                                    <a href="/create_alert" class="btn btn-primary">Create Alert</a>
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6">
                                <div class="card" >
                                <img class="card-img-top" src={imageUrl4} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Add Location</h5>
                                    <p class="card-text">Add new data point.</p>
                                    <a href="/add_location" class="btn btn-primary">Add Location</a>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            
                            <div class="col-lg-3 col-6">
                                <div class="card" >
                                <img class="card-img-top" src={imageUrl5} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Create Sensor</h5>
                                    <p class="card-text">View your added data points.</p>
                                    <a href="/create_sensor" class="btn btn-primary">Create Sensor</a>
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6">
                                <div class="card" >
                                <img class="card-img-top" src={imageUrl6} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Add Sensor</h5>
                                    <p class="card-text">Create an alert!</p>
                                    <a href="/add_sensor" class="btn btn-primary">Add Sensor</a>
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6">
                                <div class="card" >
                                <img class="card-img-top" src={imageUrl7} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Add User</h5>
                                    <p class="card-text">Add new data point.</p>
                                    <a href="/add_user" class="btn btn-primary">Add User</a>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Dashboard;