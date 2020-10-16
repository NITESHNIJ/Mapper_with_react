import React, { Component } from 'react';

import { baseUrl } from '../baseUrl';
import axios from 'axios';
import { Loading } from './LoadingComponent'
import { Line } from 'react-chartjs-2';
import ImageMapper from 'react-image-mapper';

class ViewCustomMapWithId extends Component {
    state = {
        map: {},
        success: false,
        error: false,
        loading: false,
        locations: null,
        datas: null,
        location: null,
        MAP: {
            name: "my-map",
            areas: []
          }
      }
      handleImgLoad = () => {
        this.setState(() => ({ isZoomed: true }));
      };
      handleZoomChange = (shouldZoom) => {
        this.setState(() => ({ isZoomed: shouldZoom }));
      };
      getInitialState = () => {
        return { hoveredArea: null, msg: null, moveMsg: null };
      };
      load = () => {
        this.setState({ msg: "Interact with image !" });
      };
      clicked = async (area) => {
        this.atag.click();
        await this.setState({
          msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
            area.coords
          )}!`
        });
      };
      clickedOutside = async (evt) => {
      };
      moveOnImage = (evt) => {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
          moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
        });
      };
      enterArea = (area) => {
        this.setState({
          hoveredArea: area,
          msg: `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
            area.coords
          )} !`
        });
      };
      leaveArea = (area) => {
        this.setState({
          hoveredArea: null,
          msg: `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
            area.coords
          )} !`
        });
      };
      moveOnArea = (area, evt) => {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
          moveMsg: `You moved on ${area.shape} ${
            area.name
          } at coords ${JSON.stringify(coords)} !`
        });
      };
    
      getTipPosition = (area) => {
        return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
      };
      

    async componentDidMount() {
        let token = await localStorage.getItem('token');
        await this.setState(() => ({ loading: true }));
        try {
            let data = await fetch(`${baseUrl}/custommap/getmap/${this.props.match}`, {
                method: 'get',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            data = await data.json();
            console.log(data);
            if (data.error) {
                await this.setState(() => ({ loading: false, error: 'data.error' }));
                console.log('error');
            }
            else {
                await this.setState(() => ({ map: { ...data.map }, loading: false }));
            }
            let base_url = baseUrl;
            axios.get(base_url + `/location/${this.props.match}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    console.log("locations : ");
                    console.log(response.data.data);
                    let locations=response.data.data;
                    let newmaparray=this.state.MAP.areas;
                    locations.map((loca)=>{
                        let coords=[loca.latitude,loca.longitude,5];
                        newmaparray.push({name: loca._id,
                        shape: "circle",
                        preFillColor: "red",
                        fillColor: "black",
                        coords,
                    })
                    });
                    let newMAP=this.state.MAP;
                    newMAP.areas=newmaparray;
                    this.setState({
                        locations: response.data.data,
                        MAP:newMAP
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
        catch {
            console.log('some error occured here');
        }
    }
    render() {
        if (this.state.loading) {
            return (<Loading />);
        }
        return (
            <React.Fragment>
                <div class="content-wrapper">
                    <section class="content">
                        <div class="container-fluid">
                           <ImageMapper
                           src={baseUrl + this.state.map.path}
                           map={this.state.MAP}
                           width={400}
                           onLoad={() => this.load()}
                           onClick={(area) => this.clicked(area)}
                           onMouseEnter={(area) => this.enterArea(area)}
                           onMouseLeave={(area) => this.leaveArea(area)}
                           onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                           onImageClick={(evt) => this.clickedOutside(evt)}
                           onImageMouseMove={(evt) => this.moveOnImage(evt)}
                           lineWidth={4}
                           strokeColor={"white"}
                           >
                           
                        </ImageMapper>
                        <a style={{display:'none'}} ref={a => this.atag = a}class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
                      <button type="button" class="btn btn-primary">Readings</button>
                       </a>
                        </div>
                    </section>
                </div>
            </React.Fragment>

        );
    }
}

export default ViewCustomMapWithId;