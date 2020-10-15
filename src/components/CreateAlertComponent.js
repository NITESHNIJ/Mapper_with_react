import React, { Component } from 'react';
import { baseUrl } from '../baseUrl';
import axios from 'axios';
import { Loading } from './LoadingComponent';

function RenderInnerList(props){

    if(props.instances && props.instances.length!=0){
        const inner = props.instances.map((instance) => {
            var checked = instance.checked;
            return(
                <li>
                    <input class="form-check-input" type="checkbox" defaultChecked={instance.checked} disabled={instance.checked} onChange={() => props.handleChange(instance.sensorinstid)}/> ID : {instance.sensorinstid}, SensorName: {instance.sensorname}, SensorType: {instance.sensor_type}, DataType: {instance.data_type}
                </li>
            );
        });
        return(
            <ul style={{listStyle: "none"}}>
                {inner}
            </ul>
        );
    }
    else{
        return(
            <p>No sensors available at this Location.</p>
        );
    }
}

function RenderOuterList(props){
    if(props.locations){
        const outer = props.locations.map((location) => {
            return(
                <li>
                    <h3> {location.name} </h3>
                    <p> Map Name : {location.map_name}</p>
                    <p> Lat: {location.latitude}, Lng: {location.longitude}</p>
                    <ul>
                        <RenderInnerList instances={location.sensinst} handleChange={props.handleChange}/>
                    </ul>
                </li>
            );
        });
        return(
            <ul style={{listStyle: "none"}}>
                {outer}
            </ul>
        );
    }
    else{
        return(
            <Loading />
        );
    }
}

class CreateAlert extends Component{

    constructor(props){
        super(props);
        this.state = {
            locations: null,
            hidden: true,
            selected: new Set()
        };
        this.handleCheck = this.handleCheck.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleChange(id){
        if (this.state.selected.has(id)) 
            this.state.selected.delete(id);
        else 
            this.state.selected.add(id);

    }

    handleCheck(event) {

        var arr = [];
        var someFunction = function( 
            val1, val2, setItself) { 
                arr.push(val1); 
            }; 
        this.state.selected.forEach(someFunction); 

        this.setState({
          hidden: false
        });

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const base_url = baseUrl;
        axios.post(base_url+'/alert',{
            selected: arr
        },{
            headers: headers
        })
        .then( response => {
            
            this.state.locations.map((location) => {
                location.sensinst.map((instance) => {
                    if(this.state.selected.has(instance.sensorinstid)){
                        instance.checked =true;
                    }
                });
            });

            this.setState({
                hidden: true,
                errmsg: response.data.message,
                selected : new Set()
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

        //alert("Username: " + this.username.value + " Password: " + this.password.value);
        event.preventDefault();
    }

    componentDidMount(){
        this.setState({
            hidden: false
        });

        let base_url = baseUrl;
        axios.get(base_url+'/alert', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then( response => {
            console.log("locations : ");
            console.log(response.data.locations);
            this.setState({
                hidden:true,
                locations: response.data.locations
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
                                <h1 class="m-0 text-dark">Create Alerts</h1>
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
                        <div class="card card-info">
                            <div class="card-header">
                                <h3 class="card-title">Create Alerts for Sensor Readings</h3>
                            </div>
                            <form onSubmit={this.handleCheck}>
                                <div class="card-body">
                                    <RenderOuterList locations={this.state.locations} handleChange={(id) => this.handleChange(id)}/>
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

export default CreateAlert;