import React from 'react';

//fa-spinner creates the logo of a spinner,  fa-pulse rotates the spinner, fa-3x makes the speed of rotation to 3 times
// fa-fw makes the rotation on forward direction , text-primary makes the spinner of blue color.
export const Loading = () => {
    return(
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Working on it . . .</p>
        </div>
    );
};