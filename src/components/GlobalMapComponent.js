import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import { baseUrl } from '../baseUrl';
import axios from 'axios';
import { Loading } from './LoadingComponent';
import {Line} from 'react-chartjs-2';
import { Table } from 'reactstrap';

function RenderMarkers(props){
  if(props.locations){
    if(props.locations.length != 0){
      const markers_list = props.locations.map((location) => {
        const position = [location.latitude, location.longitude];
        return (
          <Marker position={position} onclick={() => {props.markerClicked(location._id)}}>
            <Popup>
              
              <b>Name :  {location.name}</b> <br />
              <b>Latitude : </b> {location.latitude} <br />
              <b>Longitude : </b> {location.longitude} <br />
              <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
                <button type="button" class="btn btn-primary">Readings</button>
              </a>
            </Popup>
          </Marker>
        );
      });
      return(
        <React.Fragment>
          {markers_list}
        </React.Fragment>
      );
    }
    else{
      return(
        null
      );
    }
  }
  else{
    return(
      null
    );
  }
}

function RenderGraph(props) {
  if(props.datas && props.location){
    if(props.datas.length == 0){
      return(
        <div>
          <h4 style={{textAlign:"center"}}>{props.location.name}</h4>
          <h10 style={{textAlign:"center"}}><b>Lat :</b> {props.location.latitude}</h10>
          <br />
          <h10 style={{textAlign:"center"}}><b>Lng :</b> {props.location.longitude}</h10>
          <hr />
          <p><b>No readings available for sensors at this location.</b></p>
        </div>
      );
    }
    else{
      const graphs = props.datas.map((data) => {
        if(data.sensor){
          if(data.sensor[0].data_type=='continous' || data.sensor[0].data_type=='descrete_boolean' || data.sensor[0].data_type=='descrete_numbers'){
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
            return(
              <React.Fragment>
                <h5 style={{textAlign:"center"}}>Sensor ID : </h5>
                <p style={{textAlign:"center"}}>{data.sensorinstid}</p>
                <h5 style={{textAlign:"center"}}>Sensor Type : </h5>
                <p style={{textAlign:"center"}}>{data.sensor[0].name}</p>
                <Line data={val} />
                <hr />
              </React.Fragment>
            );
          }
          else{
            var count = 1;
            var map = {};
            var i;
            for(i=0;i<data.sensor[0].descrete_values.length;i++){
              map[data.sensor[0].descrete_values[i]] = count;
              count = count + 1;
            }
            var numeric_readings = [];
            for(i=0;i<data.readings.length;i++){
             numeric_readings.push(map[data.readings[i]]);
            }

            var global = [];
            for(i=0;i<data.sensor[0].descrete_values.length;i++){
              var local = [];
              local.push(data.sensor[0].descrete_values[i]);
              local.push(map[data.sensor[0].descrete_values[i]]);
              global.push(local);
            }

            const tables = global.map((local) => {
              return(
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
            return(
              <React.Fragment>
                <h5 style={{textAlign:"center"}}>Sensor ID : </h5>
                <p style={{textAlign:"center"}}>{data.sensorinstid}</p>
                <h5 style={{textAlign:"center"}}>Sensor Type : </h5>
                <p style={{textAlign:"center"}}>{data.sensor[0].name}</p>
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
      return(
        <React.Fragment>
          <h4 style={{textAlign:"center"}}>{props.location.name}</h4>
          <h10 style={{textAlign:"center"}}><b>Lat :</b> {props.location.latitude}</h10>
          <br />
          <h10 style={{textAlign:"center"}}><b>Lng :</b> {props.location.longitude}</h10>
          <hr />
          {graphs}
        </React.Fragment>
      );
    }
  }
  else{
    return(
      <div style={{textAlign:"center", verticalAlign:"center"}}>
        <Loading />
      </div>
    );
  }
}

class Maps extends Component{
  constructor() {
    super();
      this.state = {
        lat: 28.7041,
        lng: 77.1025,
        zoom: 13,
        locations: null,
        datas: null,
        location: null
      };
      this.markerClicked = this.markerClicked.bind(this);
  }

  componentDidMount(){
    let base_url = baseUrl;
      axios.get(base_url+'/location/global', {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      })
      .then( response => {
          console.log("locations : ");
          console.log(response.data.data);
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

  render(){
    const position = [this.state.lat, this.state.lng];
    return(
      <React.Fragment>
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
                <Map center={position} zoom={this.state.zoom}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  />
                  <RenderMarkers locations={this.state.locations} markerClicked={(locationid) => {this.markerClicked(locationid)}}/>
                </Map>
            </div>
          </section>
        </div>
        <aside class="control-sidebar control-sidebar-dark" style={{ position: 'absolute', top: 57+'px', height: 85+'vh', width: 40+'vh', overflow:'scroll'}}>
          <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
            <p style={{display: 'inline', float:"right"}}>
            <i class="fa fa-close">Close</i>
            </p>
          </a>
          <div class="r-slider">
            <RenderGraph datas={this.state.datas} location={this.state.location}/>
          </div>
        </aside>
      </React.Fragment>
    );
  }
}

export default Maps;