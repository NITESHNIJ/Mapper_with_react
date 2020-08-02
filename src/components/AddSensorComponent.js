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
                    <div class="card bg-info" style={{border: (location._id == props.selected_location)?"solid black 15px":"solid white 15px"}} onClick={() => props.ChangeSelectedLocation(location._id)}>
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
                    <div class="card bg-info" style={{border:"solid white 15px"}} style={{border: (sensor._id == props.selected_sensor)?"solid black 15px":"solid white 15px"}} onClick={() => props.ChangeSelectedSensor(sensor._id)}>
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
            sensors: null,
            selected_location : null,
            selected_sensor : null,
            hidden: true,
            errmsg: ''
        };
        this.ChangeSelectedLocation = this.ChangeSelectedLocation.bind(this);
        this.ChangeSelectedSensor = this.ChangeSelectedSensor.bind(this);
        this.handleData = this.handleData.bind(this);
    }


    handleData(event) {
        this.setState({
          hidden: false
        });

        if(this.state.selected_location == null){
            alert('Please select a location.');
            event.preventDefault();
            this.setState({
                hidden: true
            });
            return;
        }

        if(this.state.selected_sensor == null){
            alert('Please select a sensor');
            event.preventDefault();
            this.setState({
                hidden: true
            });
            return;
        }

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const base_url = baseUrl;
        axios.post(base_url+'/sensorinst',{
            locationid: this.state.selected_location,
            sensorid: this.state.selected_sensor,
            count: this.count.value
        },{
            headers: headers
        })
        .then( globalresponse => {

            axios.post(base_url+'/code',{
                locationid: this.state.selected_location
            })
            .then( response => {
                axios.post(base_url+'/code',{
                        locationid: this.state.selected_location
                    })
                    .then( response => {
                        console.log("repsonse from post path : ");
                        console.log(response);
                        console.log(globalresponse.data.message);
                        this.setState({
                            hidden: true,
                            errmsg: globalresponse.data.message,
                            selected_location: null,
                            selected_sensor: null
                        });
                        this.count.value = 0;
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
        event.preventDefault();
    }


    ChangeSelectedLocation(id){
        this.setState({
            selected_location: id
        });
    }

    ChangeSelectedSensor(id){
        this.setState({
            selected_sensor: id
        });
    }

    componentDidMount(){

        let base_url = baseUrl;
        axios.get(base_url+'/location', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then( response => {
            console.log("locations : ");
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
            console.log("sensors : ");
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
                            
                                <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                                    <Loading />
                                </div>
                                <p><b>{this.state.errmsg}</b></p>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label><b>Location</b></label>
                                        <RenderLocations locations={this.state.locations} ChangeSelectedLocation={this.ChangeSelectedLocation} selected_location={this.state.selected_location}/>
                                    </div>
                                    <div class="form-group">
                                        <label><b>Sensors</b></label>
                                        <RenderSensors sensors={this.state.sensors} ChangeSelectedSensor={this.ChangeSelectedSensor} selected_sensor={this.state.selected_sensor}/>   
                                    </div>
                                    <div class="form-group">
                                        <label for="count"><b>Number of sensors to be added</b></label>
                                        <Input required type="number" id="count" name="count" innerRef={(input) => this.count = input}  />
                                    </div>
                                </div>
                            <form role="form" onSubmit={this.handleData}>
                                <div class="card-footer">
                                <button type="submit" class="btn btn-primary">Add Sensor(s)</button>
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