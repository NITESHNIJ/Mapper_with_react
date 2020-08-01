import React, {Component} from "react";
import { Input, Label } from 'reactstrap';
import { Loading } from './LoadingComponent';
import axios from "axios";
//import { TextInput } from 'react-native';


import { baseUrl } from '../baseUrl';

class CreateSensor extends Component{
    constructor(props){
        super(props);
        this.sensor_type='first value';
        this.data_type='continous';
        this.state = {
            hidden: true,
            errmsg: '',
            max_range_hidden: false,
            min_range_hidden: false,
            descrete_values_hidden: true
        };

        this.data_type_change = this.data_type_change.bind(this);
        this.handleSensor = this.handleSensor.bind(this);
        this.sensor_type_change = this.sensor_type_change.bind(this);
    }

    data_type_change = (event) => {
        this.data_type = event.target.value;
        if(event.target.value == 'continous'){
            this.setState({
                max_range_hidden: false,
                min_range_hidden: false,
                descrete_values_hidden: true      
            });
        }
        else{
            if(event.target.value == 'descrete_boolean'){
                this.setState({
                    max_range_hidden: true,
                    min_range_hidden: true,
                    descrete_values_hidden: true      
                });
            }
            else{
                this.setState({
                    max_range_hidden: true,
                    min_range_hidden: true,
                    descrete_values_hidden: false      
                });
            }
        }
    }

    sensor_type_change = (event) => {
        this.sensor_type = event.target.value;
    }

    handleSensor(event){
        this.setState({
            hidden: false
        });
  
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        let descrete_values = '';
        if(this.data_type == 'descrete_boolean')
            descrete_values = '0 1';
        else
            descrete_values = this.descrete_values.value;

        const base_url = baseUrl;
        axios.post(base_url+'/sensor',{
            name: this.name.value,
            unit: this.unit.value,
            min_range: this.min_range.value,
            max_range: this.max_range.value,
            descrete_values: descrete_values,
            sensor_type: this.sensor_type,
            data_type: this.data_type
        },{
            headers: headers
        })
        .then( response => {
            console.log(response.data.message);
            this.setState({
                hidden: true,
                errmsg: response.data.message
            });
            this.name.value = '';
            this.unit.value = '';
            this.min_range.value = 0;
            this.max_range.value = 0;
            this.descrete_values.value = '';
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
      
    render(){
        return(
            <div class="content-wrapper inner_body_create_sensor">
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h3 class="m-0 text-dark">Create a sensor...</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <section class="content">
                    <div class="container-fluid">
                        <div class="card card-secondary col-8 mx-auto" style={{backgroundColor: 'transparent', border:"0px none none", boxShadow: "none"}}>
                            <form onSubmit={this.handleSensor}  style={{marginBottom: "20px"}}>
                                <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                                    <Loading />
                                </div>
                                <p><b>{this.state.errmsg}</b></p>
                                <div class="card-body">
                                    <div class="form-group">
                                        <Label htmlFor="name"><span style={{color: "black"}}>Name</span></Label>
                                        <Input required type="text" id="name" name="name" innerRef={(input) => this.name = input}/>
                                    </div>
                                    <div class="form-group">
                                        <Label htmlFor="unit"><span style={{color: "black"}}>Unit of recieved data(if applicable)</span></Label>
                                        <Input type="text" id="unit" name="unit" innerRef={(input) => this.unit = input}/>
                                    </div>
                                    <div class="form-group">
                                        <Label><span style={{color: "black"}}>Choose the type of Sensor</span></Label>
                                        <br />
                                        <select onChange={this.sensor_type_change}>
                                            <option value="first value">First Value</option>
                                            <option value="second value">Second Value</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <Label><span style={{color: "black"}}>Choose the type of recieved data</span></Label>
                                        <br />
                                        <select onChange={this.data_type_change}>
                                            <option value="continous">Continous</option>
                                            <option value="descrete_boolean">Descrete Boolean</option>
                                            <option value="descrete_strings">Descrete Strings</option>
                                            <option value="descrete_numbers">Descrete Numbers</option>
                                        </select>
                                    </div>
                                    <div class="form-group" hidden={(this.state.min_range_hidden) ? "hidden" : ''}>
                                        <Label htmlFor="min_range"><span style={{color: "black"}}>Min Range</span></Label>
                                        <Input type="number" id="min_range" name="min_range" innerRef={(input) => this.min_range = input}  />
                                    </div>
                                    <div class="form-group" hidden={(this.state.max_range_hidden) ? "hidden" : ''}>
                                        <Label htmlFor="max_range"><span style={{color: "black"}}>Max Range</span></Label>
                                        <Input type="number" id="max_range" name="max_range" innerRef={(input) => this.max_range = input}  />
                                    </div>
                                    <div class="form-group" hidden={(this.state.descrete_values_hidden) ? "hidden" : ''}>
                                        <Label htmlFor="descrete_values"><span style={{color: "black"}}>Enter the possible value(s)(separate by a space)</span></Label>
                                        <Input type="text" id="descrete_values" name="descrete_values" innerRef={(input) => this.descrete_values = input}  />
                                    </div>
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

export default CreateSensor;