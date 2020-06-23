import React, {Component} from 'react';

class ErrorHandle extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h3>Server Error</h3>
            </div>
        );
    }
}

export default ErrorHandle;