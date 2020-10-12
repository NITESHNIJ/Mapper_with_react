import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormText, Container, Button } from 'reactstrap';
import { baseUrl } from '../baseUrl';
import { Loading } from './LoadingComponent'
class AddCustomMap extends Component {
    state = {
        error: false,
        success: false,
        loading: false,
        name: '',
        map: '',
        formdata: new FormData(),
        theInputKey:''
    }
    functionThatResetsTheFileInput() {
        let randomString = Math.random().toString(36);
      
        this.setState({
          theInputKey: randomString
        });
      }
    handleChange = (name) => (value) => {
        this.setState(() => ({ [name]: value }));
        this.state.formdata.set(name, value);
    }
    submit = async (e) => {
        e.preventDefault();
        this.setState(()=>({loading:true,error:false,success:false}));
        if(this.state.name==='')
        {
            this.setState(()=>({loading:false,error:'Fill All the Fields'}));
        }
        let token = await localStorage.getItem('token');
        await fetch(`${baseUrl}/custommap`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: this.state.formdata
        })
        .then(async (data1) => {
                let data=await data1.json();
                console.log(data);
                if (data.error) {
                    this.setState(() => ({ error: data.error, loading: false,name:''}));
                    this.functionThatResetsTheFileInput();
                    return;
                }
                else {
                    this.setState(() => ({ success:"Map Uploaded SuccesFully", loading: false, formData: new FormData() }));
                    this.functionThatResetsTheFileInput();
                 
                }
            })
            .catch(err => this.setState({ error: 'some error occured,Try Again', loading: false,name:''}))

    }
    loadingMesaage = () => {
        if (this.state.loading) {
            return (<div className="alert alert-info" style={{ display: this.state.loading ? '' : 'none' }}>
                Uploading...
            </div>)
        }
    }
    successMesaage = () => {
        if (this.state.success) {
            return (<div className="alert alert-success" style={{ display: this.state.success ? '' : 'none' }}>
                Map Uploaded Successfully
            </div>)
        }
    }
    errorMesaage = () => {
        if (this.state.error) {
            return (<div className="alert alert-danger" style={{ display: this.state.error ? '' : 'none' }}>
                {this.state.error}
            </div>)
        }
    }
    render() {

        return (
            <div className="content-wrapper">
                <Container fluid>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <div class="col-sm-6">
                                    <h1 class="m-0 text-dark">Upload Custom Maps here</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.successMesaage()}
                    {this.errorMesaage()}
                    {this.loadingMesaage()}
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Name of Map</Label>
                            <Input value={this.state.name} onChange={(e) => this.handleChange("name")(e.target.value)} type="text" name="email" id="exampleEmail" placeholder="Name" />

                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleFile">File</Label>
                            <Input key={this.state.theInputKey} onChange={(e) => this.handleChange("map")(e.target.files[0])} type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                                Upload Your Custom map here
                        </FormText>
                        </FormGroup>
                    </Form>
                    <Button onClick={this.submit} style={{ textAlign: 'center' }}>Upload</Button>

                </Container>
            </div>
        )
    }
}
export default AddCustomMap;