import React, {Component} from "react";
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { Col, Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Loading } from './LoadingComponent';
//import Carousel from 'react-elastic-carousel'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function RenderLocations(props){
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };
    if(props.locations != null){
        if(props.locations.length == 0){
            return(
                <div>No Location available for this user!</div>
            );
        }
        else{
            const locations_list = props.locations.map((location) => {
                return (
                    <div class="card bg-secondary">
                        <div class="card-body">
                            <h5 class="card-title">{location.name}</h5>
                            <p class="card-text">Latitude : {location.latitude}</p>
                            <p class="card-text">Longitude : {location.longitude}</p>
                        </div>
                    </div>
                );
            });
            return(
                <Carousel responsive={responsive}>
                    {locations_list}
                </Carousel>
            );
        }
    }
    else{
        return(
            <Loading />
        );
    }
}

function RenderSensors(props){
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };
    if(props.sensors != null){
        if(props.sensors.length == 0){
            return(
                <div>No Sensors available for this user!</div>
            );
        }
        else{
            const sensors_list = props.sensors.map((sensor) => {
                return (
                    <div class="card bg-secondary">
                        <div class="card-body">
                            <h5 class="card-title">{sensor.name}</h5>
                            <p class="card-text">Sensor Type : {sensor.sensor_type}</p>
                            <p class="card-text">Data Type : {sensor.data_type}</p>
                        </div>
                    </div>
                );
            });
            return(
                <Carousel responsive={responsive}>
                    {sensors_list}
                </Carousel>
            );
        }
    }
    else{
        return(
            <Loading />
        );
    }
}


class AddSensor extends Component{

    constructor(props){
        super(props);
        this.state = {
            locations: null,
            sensors: null
        };
    }

    componentDidMount(){

        let base_url = baseUrl;

        axios.get(base_url+'/location', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then( response => {
            console.log(response);
            this.setState({
                locations: response.data.data
            });
        }, 
        error => {
            alert("Session Expired");
            this.props.clickit('/logout');
        })
        .catch(error => {
            alert("Session Expired");
            this.props.clickit('/logout');
        });


        axios.get(base_url+'/sensor', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then( response => {
            console.log(response);
            this.setState({
                sensors: response.data.data
            });
        }, 
        error => {
            alert("Session Expired");
            this.props.clickit('/logout');
        })
        .catch(error => {
            alert("Session Expired");
            this.props.clickit('/logout');
        });


    }

    render(){



        return(
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">Add Sensors</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <section class="content">
                    <div class="container-fluid">
                        <div class="card">
                        {/* onSubmit={this.handleUser} */}
                            <form >
                                <div class="card-body">
                                    <div class="form-group">
                                        <label><b>Location</b></label>
                                        <RenderLocations locations={this.state.locations}/>
                                    </div>
                                    <div class="form-group">
                                        <label><b>Sensors</b></label>
                                        <RenderSensors sensors={this.state.sensors}/>   
                                    </div>
                                    <div class="form-group">
                                        <label for="count"><b>Number of sensors to be added</b></label>
                                        <Input required type="number" id="count" name="count" innerRef={(input) => this.count = input}  />
                                    </div>
                                </div>

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">Add Sensors</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default AddSensor;