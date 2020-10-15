import React, {Component} from "react";
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { Col, Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Loading } from './LoadingComponent';
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
                    <div class="card bg-secondary" style={{border: (location._id == props.selected_location)?"solid black 15px":"solid white 15px"}} onClick={() => props.ChangeSelectedLocation(location._id)}>
                        <div class="card-body">
                            <h5 class="card-title">{location.name}</h5>
                            <p class="card-text">Map Name : {location.map_name}</p>
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


class ViewCode extends Component{
    constructor(props){
        super(props);
        this.state = {
            locations: null,
            selected_location : null,
            hidden: true,
            errmsg: '',
            code: "Select Location to see it's Code",
            codeshow: true
        };
        this.ChangeSelectedLocation = this.ChangeSelectedLocation.bind(this);
        this.getCode = this.getCode.bind(this);
    }

    getCode(locationid){
        this.setState({
            codeshow: false
        });
        console.log("locationid : "+locationid);
        var base_url = baseUrl;
        axios.get(base_url+`/code/${locationid}`, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then( response => {
            console.log("code : ");
            console.log(response.data.code);
            this.setState({
                code: response.data.code,
                codeshow: true
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

    ChangeSelectedLocation(id){

        // var base_url = baseUrl;
        // axios.post(base_url+'/code',{
        //     locationid: id
        // })
        // .then( response => {
            
        // }, 
        // error => {
        //   this.setState({
        //     hidden: true,
        //     errmsg: error.response.data.message
        //   });
        //   alert("Session Expired");
        //   this.props.clickit('/logout');
        // })
        // .catch(error => {
        //     this.setState({
        //         hidden: true,
        //         errmsg: error.response.data.message
        //     });
        //     alert("Session Expired");
        //     this.props.clickit('/logout');
        // });







        console.log("ChangeSelectedLocation : "+id);
        this.setState({
            selected_location: id
        });
        this.getCode(id);
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
    }

    render(){
        return(
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">View Code</h1>
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
                                <div class='code'>
                                    <div  hidden={(this.state.codeshow) ? "hidden" : ''}>
                                        <Loading />
                                    </div>
                                    <div  hidden={(this.state.codeshow) ? '' : "hidden"}>
                                        <div>
                                            {this.state.code.split("<br>").map((i,key) => {
                                                return <div key={key}>{i}</div>;
                                            })}
                                        </div>
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

export default ViewCode;