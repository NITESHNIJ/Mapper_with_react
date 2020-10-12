import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';

import imageUrl1 from "../images/add_data.jpg";
import imageUrl2 from "../images/map.jpg";

import { baseUrl } from '../baseUrl';

class AddLocationMid extends Component{
    render(){
        return(
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">Choose the type of Map ...</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-3 col-12">
                                <div class="card" >
                                <img class="card-img-top" src={imageUrl1} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Global Map</h5>
                                    <p class="card-text">Add a location to Global Map.</p>
                                    <a onClick={() => {this.props.clickit('/add_location_global')}} style={{color: 'white',cursor:'pointer'}} class="btn btn-primary">Add Location</a>
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-12">
                                <div class="card" >
                                <img class="card-img-top" src={imageUrl2} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Customized Map</h5>
                                    <p class="card-text">Add a location to Customized Map.</p>
                                    <a onClick={() => {this.props.clickit('/custom_maps')}} style={{color: 'white',cursor:'pointer'}} class="btn btn-primary">Show Maps</a>
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

export default AddLocationMid;