import * as ActionTypes from './ActionTypes';

export const initialState = {
    token : '', 
    message: '',
    name: '',
    companyname: '',
    usertype: '',
    typeofdatabase: '',
    userpic: '',
    companylogo: '',
    parentid: ''
};

export const Reducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.FILL_STORE:
            state.token = action.payload.token;
            state.message = action.payload.message;
            state.name = action.payload.name;
            state.companyname = action.payload.companyname;
            state.usertype = action.payload.usertype;
            state.typeofdatabase = action.payload.typeofdatabase;
            state.userpic = action.payload.userpic;
            state.companylogo = action.payload.companylogo;
            state.parentid = action.payload.parentid;
            return state;
        case ActionTypes.EMPTY_STORE:
            state.token = '';
            state.message = '';
            state.name = '';
            state.companyname = '';
            state.usertype = '';
            state.typeofdatabase = '';
            state.userpic = '';
            state.companylogo = '';
            state.parentid = '';
            return state;
        default:
            return state;
    }
};