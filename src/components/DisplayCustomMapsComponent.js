import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';
import { Loading } from './LoadingComponent';
import axios from "axios";
import { baseUrl } from '../baseUrl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function RenderMaps(props){
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
    if(props.maps != null){
        if(props.maps.length == 0){
            return(
                <div>No Maps available for this user!</div>
            );
        }
        else{
            const maps_list = props.maps.map((map) => {
                console.log(baseUrl  + map.path);
                return (
                        <div class="card" style={{margin: "20px"}}>
                            <img class="card-img-top" src={baseUrl + map.path} alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-text">{map.name}</h5>
                            </div>
                        </div>
                );
            });
            return(
                <Carousel responsive={responsive}>
                    {maps_list}
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

class CustomMaps extends Component{
    constructor(props){
        super(props);
        this.state = {
            maps: null
        };
    }

    componentDidMount(){
        let base_url = baseUrl;
        axios.get(base_url+'/custommap', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then( response => {
            console.log("maps : ");
            console.log(response);
            this.setState({
                maps: response.data.data
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
                                <h1 class="m-0 text-dark">Select a Map ...</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <section class="content">
                    <div class="container-fluid">
                        <RenderMaps maps={this.state.maps}></RenderMaps>
                    </div>
                </section>
            </div>
        );
    }
}

export default CustomMaps;