import * as ActionTypes from './ActionTypes';


export const fillstore = (token, message, name, companyname,usertype, typeofdatabase, userpic, companylogo, parentid) => ({
    type : ActionTypes.FILL_STORE,
    payload : {
        token : token, 
        message: message,
        name: name,
        companyname: companyname,
        usertype: usertype,
        typeofdatabase: typeofdatabase,
        userpic: userpic,
        companylogo: companylogo,
        parentid: parentid
    }
});

export const emptystore = () => ({
    type : ActionTypes.EMPTY_STORE,
    payload : {
        token : '', 
        message: '',
        name: '',
        companyname: '',
        usertype: '',
        typeofdatabase: '',
        userpic: '',
        companylogo: '',
        parentid: ''
    }
});