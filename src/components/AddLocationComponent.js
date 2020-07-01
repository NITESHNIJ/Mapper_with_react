import React, {Component} from "react";
import { Input, Label } from 'reactstrap';
import { Loading } from './LoadingComponent';
import axios from "axios";

import { baseUrl } from '../baseUrl';

class AddLocation extends Component{
    constructor(props){
        super(props);
        this.state = {
            hidden: true,
            errmsg: ""
        };
        this.handleData = this.handleData.bind(this);
    }

    handleData(event) {
        this.setState({
          hidden: false
        });

        const base_url = baseUrl;
        axios.post(base_url+'/add_location',{
          latitude: this.latitude.value,
          longitude: this.longitude.value,
          name: this.name.value
        })
        .then( response => {
          //console.log(response);
          this.setState({
            hidden: true,
            errmsg: response.data.message
          });
        }, 
        error => {
          this.setState({
            hidden: true,
            errmsg: error.response.data.message
          });
        })
        .catch(error => {
          this.props.history.push('/error')
        });

        //alert("Username: " + this.username.value + " Password: " + this.password.value);
        event.preventDefault();
    }

    render(){
        return(
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">Add Location</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                    <Loading />
                </div>

                <section class="content">
                    <div class="container-fluid">
                        
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Add Location...</h3>
                        </div>
                        <form role="form" onSubmit={this.handleData}>
                            <div class="card-body">
                                <div class="form-group">
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input required type="text" id="latitude" name="latitude" innerRef={(input) => this.latitude = input} />
                                </div>
                                <div class="form-group">
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input required type="text" id="longitude" name="longitude" innerRef={(input) => this.longitude = input}  />
                                </div>
                                <div class="form-group">
                                    <Label htmlFor="name">Name</Label>
                                    <Input required type="text" id="name" name="name" innerRef={(input) => this.name = input}  />
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

export default AddLocation;