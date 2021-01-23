import { BehaviorSubject } from 'rxjs';
import { authHeader } from "../middleware/auth-header";
import { handleResponse } from '../helpers/handle-response';

const api = 'https://tsukuyomi-nk.herokuapp.com';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('User')));

export const userService = {
    login,
    register,
    logout,
    getAll,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${api}/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('User', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}
function register(name,email,teamName,salary,password){
    const requestOptions = {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name,email,teamName,salary,password})
    };
    return fetch(`${api}/users/register`, requestOptions).then(handleResponse);
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('User');
    currentUserSubject.next(null);
}

//function to get all user details
function getAll(){ 
    const requestOptions ={
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${api}/users/`,requestOptions).then(handleResponse);
}