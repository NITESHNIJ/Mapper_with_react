import React, { Component } from 'react';

import { baseUrl } from '../baseUrl';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import axios from 'axios';
import { Loading } from './LoadingComponent'
import { Line } from 'react-chartjs-2';
import ImageMapper from 'react-image-mapper';
;
function RenderGraph(props) {
    if (props.datas && props.location) {
        if (props.datas.length == 0) {
            return (
                <div>
                    <h4 style={{ textAlign: "center" }}>{props.location.name}</h4>
                    <h10 style={{ textAlign: "center" }}><b>Lat :</b> {props.location.latitude}</h10>
                    <br />
                    <h10 style={{ textAlign: "center" }}><b>Lng :</b> {props.location.longitude}</h10>
                    <hr />
                    <p><b>No readings available for sensors at this location.</b></p>
                </div>
            );
        }
        else {
            const graphs = props.datas.map((data) => {
                if (data.sensor) {
                    if (data.sensor[0].data_type == 'continous' || data.sensor[0].data_type == 'descrete_boolean' || data.sensor[0].data_type == 'descrete_numbers') {
                        const val = {
                            labels: ['0', '1', '2', '3', '4', '5', '6'],
                            datasets: [
                                {
                                    label: 'values',
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: 'rgba(75,192,192,0.4)',
                                    borderColor: 'rgba(75,192,192,1)',
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: 'rgba(75,192,192,1)',
                                    pointBackgroundColor: '#fff',
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: data.readings
                                }
                            ]
                        };
                        return (
                            <React.Fragment>
                                <h5 style={{ textAlign: "center" }}>Sensor ID : </h5>
                                <p style={{ textAlign: "center" }}>{data.sensorinstid}</p>
                                <h5 style={{ textAlign: "center" }}>Sensor Type : </h5>
                                <p style={{ textAlign: "center" }}>{data.sensor[0].name}</p>
                                <Line data={val} />
                                <hr />
                            </React.Fragment>
                        );
                    }
                    else {
                        var count = 1;
                        var map = {};
                        var i;
                        for (i = 0; i < data.sensor[0].descrete_values.length; i++) {
                            map[data.sensor[0].descrete_values[i]] = count;
                            count = count + 1;
                        }
                        var numeric_readings = [];
                        for (i = 0; i < data.readings.length; i++) {
                            numeric_readings.push(map[data.readings[i]]);
                        }

                        var global = [];
                        for (i = 0; i < data.sensor[0].descrete_values.length; i++) {
                            var local = [];
                            local.push(data.sensor[0].descrete_values[i]);
                            local.push(map[data.sensor[0].descrete_values[i]]);
                            global.push(local);
                        }

                        const tables = global.map((local) => {
                            return (
                                <tr>
                                    <td>{local[0]}</td>
                                    <td>{local[1]}</td>
                                </tr>
                            );
                        });

                        const val = {
                            labels: ['0', '1', '2', '3', '4', '5', '6'],
                            datasets: [
                                {
                                    label: 'values',
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: 'rgba(75,192,192,0.4)',
                                    borderColor: 'rgba(75,192,192,1)',
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: 'rgba(75,192,192,1)',
                                    pointBackgroundColor: '#fff',
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: numeric_readings
                                }
                            ]
                        };
                        return (
                            <React.Fragment>
                                <h5 style={{ textAlign: "center" }}>Sensor ID : </h5>
                                <p style={{ textAlign: "center" }}>{data.sensorinstid}</p>
                                <h5 style={{ textAlign: "center" }}>Sensor Type : </h5>
                                <p style={{ textAlign: "center" }}>{data.sensor[0].name}</p>
                                <div class="tabler">
                                    <table>
                                        <tbody>
                                            {tables}
                                        </tbody>
                                    </table>
                                </div>
                                <Line data={val} />
                                <hr />
                            </React.Fragment>
                        );
                    }
                }
            });
            return (
                <React.Fragment>
                    <h4 style={{ textAlign: "center" }}>{props.location.name}</h4>
                    <h10 style={{ textAlign: "center" }}><b>Lat :</b> {props.location.latitude}</h10>
                    <br />
                    <h10 style={{ textAlign: "center" }}><b>Lng :</b> {props.location.longitude}</h10>
                    <hr />
                    {graphs}
                </React.Fragment>
            );
        }
    }
    else {
        return (
            <div style={{ textAlign: "center", verticalAlign: "center" }}>
                <Loading />
            </div>
        );
    }
}

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
       await this.markerClicked(area.name);
       // await this.markerClicked('5f8990d33e5f242ac8305a6a');
        this.atag.click();
        await this.setState({
          msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
            area.coords
          )}!`
        });
      };
      clickedOutside = async (evt) => {
        // let areas = this.state.MAP.areas;
        // let newareas = [
        //   ...areas,
        //   {
        //     name: "clicked",
        //     shape: "circle",
        //     coords: [evt.nativeEvent.layerX, evt.nativeEvent.layerY, 5],
        //     preFillColor: "purple",
        //     fillColor: "black"
        //   }
        // ];
        // const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        // this.setState({
        //   msg: `You clicked on the image at coords ${JSON.stringify(coords)} !`
        // });
        // let MAP = {
        //   name: this.state.MAP.name,
        //   areas: newareas
        // };
        // await this.setState(() => ({ MAP }));
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
      markerClicked(locationid){
        this.setState({
          datas: null,
          location: null
        });
        console.log(locationid);
        this.setState({
          location: this.state.locations.filter((location) => location._id === locationid)[0]
        });
        console.log(this.state.location);
        var base_url = baseUrl;
        axios.get(base_url+`/data/${locationid}`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then( response => {
          console.log("datas : ");
          console.log(response.data.ret);
          this.setState({
              datas: response.data.ret
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
            // <div class="content-wrapper">
            //     <div class="content-header">
            //         <div class="container-fluid">
            //             <div class="row mb-2">
            //                 <div class="col-sm-6">
            //                     <h1 class="m-0 text-dark">Dashboard</h1>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>

            //     <section class="content">
            //         <div class="container-fluid">
            //             Nothing special for now about...
            //             {this.props.match}
            //             {JSON.stringify(this.state)}
            //         </div>
            //     </section>
            // </div>
            <React.Fragment>
                <div class="content-wrapper">
                    <section class="content">
                        <div class="container-fluid">
                         <div style={{ width: '800px',height:'800px', border: '2px solid black' }}>
                           <ImageMapper
                           src={baseUrl + this.state.map.path}
                           map={this.state.MAP}
                           width={800}
                           height={800}
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
                        </div>
                        <a style={{display:'none'}} ref={a => this.atag = a}class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
                      <button type="button" class="btn btn-primary">Readings</button>
                       </a>
                        </div>
                    </section>
                </div>
                <aside class="control-sidebar control-sidebar-dark" style={{ position: 'absolute', top: 57 + 'px', height: 85 + 'vh', width: 40 + 'vh', overflow: 'scroll' }}>
                    <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
                        <p style={{ display: 'inline', float: "right" }}>
                            <i class="fa fa-close">Close</i>
                        </p>
                    </a>
                    <div class="r-slider">
                        <RenderGraph datas={this.state.datas} location={this.state.location} />
                    </div>
                </aside>
            </React.Fragment>

        );
    }
}

export default ViewCustomMapWithId;