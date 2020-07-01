import React, {Component} from 'react';
import { Loading } from './LoadingComponent';

class Logout extends Component{
    constructor(props){
        super(props);
        this.state = {
            hidden : false
        }
        localStorage.removeItem('token');
        this.setState({
            hidden: true
        });
        this.props.history.push('/welcome')
    }

    render(){

        return(
            <div class="container">
                <div  hidden={(this.state.hidden) ? "hidden" : ''}>
                    <Loading />
                    Logging out...
                </div>
            </div>
        );
    }
}

export default Logout;
