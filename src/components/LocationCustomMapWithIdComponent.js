import React, { Component } from 'react';

import { baseUrl } from '../baseUrl';
import axios from 'axios';
import { Loading } from './LoadingComponent'
import { Line } from 'react-chartjs-2';
import ImageMapper from 'react-image-mapper';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'

class ViewCustomMapWithId extends Component {
  state = {
    map: {},
    success: false,
    error: false,
    loading: false,
    locations: null,
    location: null,
    modal: false,
    name: 'name',
    type: 'raspberry',
    MAP: {
      name: "my-map",
      areas: []
    }

  }
  toggle = () => {
    this.setState((prev) => ({ modal: !prev.modal }));
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
    
    await this.setState({
      msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
        area.coords
      )}!`
    });
  };
  clickedOutside = async (evt) => {
    
    let areas = this.state.MAP.areas;
    let newareas = [
      ...areas,
      {
        name: "clicked",
        shape: "circle",
        coords: [evt.nativeEvent.layerX, evt.nativeEvent.layerY, 5],
        preFillColor: "purple",
        fillColor: "black"
      }
    ];
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    this.setState({
      location: coords
    });
    let MAP = {
      name: this.state.MAP.name,
      areas: newareas
    };

    await this.setState(() => ({ MAP, modal: true,success:false,error:false}));
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
      moveMsg: `You moved on ${area.shape} ${area.name
        } at coords ${JSON.stringify(coords)} !`
    });
  };
  loadingMesaage = () => {
    if (this.state.loading) {
      return (<div className="alert alert-info mt-5" style={{ display: this.state.loading ? '' : 'none' }}>
        Adding Location...
      </div>)
    }
  }
  successMesaage = () => {
    if (this.state.success) {
      return (<div className="alert alert-success mt-5" style={{ display: this.state.success ? '' : 'none' }}>
        Location Added Successfully
      </div>)
    }
  }
  errorMesaage = () => {
    if (this.state.error) {
      return (<div className="alert alert-danger mt-5" style={{ display: this.state.error ? '' : 'none' }}>
        {this.state.error}
      </div>)
    }
  }
  handleChange = (val) => {
    this.setState(() => ({ name: val }));
  }

  getTipPosition = (area) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };
  data_type_change = (val) => {
    this.setState(() => ({ type: val }));
  }
  toggleAndremove=async ()=>{
    await this.setState((prev) => ({ modal: !prev.modal }));
    let newAreas=this.state.MAP.areas;
    newAreas.pop();
    let newMAP={
      name:this.state.MAP.name,
      areas:newAreas
    }
    await this.setState(()=>({MAP:newMAP}));

  }
  handleData = (event) => {
    event.preventDefault();
    this.setState(() => ({ loading: true, success: false, error: false }));
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const base_url = baseUrl;
    axios.post(base_url + `/location`, {
      mapid: this.props.match,
      latitude: this.state.location.x,
      longitude: this.state.location.y,
      name: this.state.name,
      type: this.state.type
    }, {
      headers: headers
    })
      .then(response => {
        console.log(response.data.message);

        this.setState({
          loading: false,
          success: response.data.message,
          location: null,
          modal: false,
          name: ''
        });

      },
        error => {
          console.log("error 1", error);
          this.setState({
            loading: false,
            error: error.response.data.message
          });
          alert("Session Expired");
          this.props.clickit('/logout');
        })
      .catch(error => {
        console.log("error 2", error);
        this.setState({
          loading: false,
          error: `Some Error Occured ${error} `
        });
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
          let locations = response.data.data;
          let newmaparray = this.state.MAP.areas;
          locations.map((loca) => {
            let coords = [loca.latitude, loca.longitude, 5];
            newmaparray.push({
              name: loca._id,
              shape: "circle",
              preFillColor: "red",
              fillColor: "black",
              coords,
            })
          });
          let newMAP = this.state.MAP;
          newMAP.areas = newmaparray;
          this.setState({
            locations: response.data.data,
            MAP: newMAP
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
        <div class="content-wrapper" style={{overflow:"scroll" }}>
          <section class="content">
            <div class="container-fluid">
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Enter The Details</ModalHeader>
                <ModalBody>
                  <div class="card card-secondary">
                    <div class="card-header">
                      <h3 class="card-title">Add Location...</h3>
                    </div>
                    <form role="form" onSubmit={this.handleData}>
                      <div class="card-body">
                        <div class="form-group">
                          <Label htmlFor="name">Name</Label>
                          <Input required type="text" id="name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e.target.value)} />
                        </div>
                        <div class="form-group">
                          <Label><span>Choose the type of Micro-Controller</span></Label>
                          <br />
                          <select onChange={(e) => this.data_type_change(e.target.value)} value={this.state.type}>
                            <option value="arduino">ARDUINO - EMBEDDED C</option>
                            <option value="raspberry">RASPBERRYPI - PYTHON</option>
                          </select>
                        </div>
                      </div>

                      <div class="card-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </form>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleAndremove}>Cancel</Button>
                </ModalFooter>
              </Modal>
              {this.successMesaage()}
              {this.errorMesaage()}
              {this.loadingMesaage()}
              <div style={{ width: '800px',height:'600px'}}>
                <ImageMapper
                  src={baseUrl + this.state.map.path}
                  map={this.state.MAP}
                  width={800}
                  height={600}
                  onLoad={() => this.load()}
                  onClick={(area) => this.clicked(area)}
                  onMouseEnter={(area) => this.enterArea(area)}
                  onMouseLeave={(area) => this.leaveArea(area)}
                  onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                  onImageClick={(evt) => this.clickedOutside(evt)}
                  onImageMouseMove={(evt) => this.moveOnImage(evt)}
                  lineWidth={4}
                  strokeColor={"white"}>
                </ImageMapper>
              </div>
              <a style={{ display: 'none' }} ref={a => this.atag = a} class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
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