import { handleResponse } from '../helpers/handle-response';
import {authHeader} from '../middleware/auth-header';

//api url
const api = 'https://tsukuyomi-nk.herokuapp.com';

export const attService = {
    attUpdate,
    getById,
    getAll,
    updateById
}
//function update attendance by id 
function updateById(id,type){
    const requestOptions = {
        method:'POST',
        headers:{'Content-Type': 'application/json',...authHeader()},
        body: JSON.stringify({id,type})
    };
    return fetch(`${api}/att/updt`, requestOptions).then(handleResponse);
}
function attUpdate(type,userId,teamName,Time,entryTime,email){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type,userId,teamName,Time,entryTime,email })
    };
    return fetch(`${api}/att/entry`, requestOptions).then(handleResponse); 
}

//function to get attendance details by id
function getById(id){
    const requestOptions ={
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${api}/att/${id}`,requestOptions).then(handleResponse);
}

//function to get attendance of all user
function getAll(){ 
    const requestOptions ={
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${api}/att/`,requestOptions).then(handleResponse);
}