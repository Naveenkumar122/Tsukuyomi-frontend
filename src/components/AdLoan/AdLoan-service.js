import { handleResponse } from '../helpers/handle-response';
import {authHeader} from '../middleware/auth-header';

//api url
const api = 'https://tsukuyomi-nk.herokuapp.com';

export const AdLoanService = {
      Entry,
      getAll,
      updateById   
}
//function update advance and loan by id 
function updateById(id,type){
    const requestOptions = {
        method:'POST',
        headers:{'Content-Type': 'application/json',...authHeader()},
        body: JSON.stringify({id,type})
    };
    return fetch(`${api}/AdLoan/updt`, requestOptions).then(handleResponse);
}
//function make post api request to the backend
function Entry(id,email,amount,type){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',...authHeader() },
        body: JSON.stringify({id,email,amount,type })
    };
    return fetch(`${api}/AdLoan/entry`, requestOptions).then(handleResponse); 
}

//function to get Advance and loan of all user
function getAll(){ 
    const requestOptions ={
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${api}/AdLoan/`,requestOptions).then(handleResponse);
}