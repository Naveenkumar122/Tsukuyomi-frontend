import React from 'react';
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
//importing services
import {userService} from '../src/components/users/user-service'
//importing middleware
import PrivateRoute from './components/middleware/PrivateRoute';
import {history} from './components/middleware/history';
//importing components 
import Nav from '../src/components/Nav';
import LoginPage from './components/users/login';
import RegisterPage from './components/users/register';
import AdminPage from './components/Admin/Admin';
import about from './components/about';
import holidays from './components/holidays';
import Home from './components/users/home';
import AdminAttUpdate from './components/Admin/AdminAttUpdate';


class  App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false,
            isLogged: false
        };
    }
    componentDidMount() {
        userService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role ==="Admin",
            isLogged: x != null
        }));
    }

    logout() {
        userService.logout();
        history.push('/login');
    }


    render(){

    const isLogged = this.state.isLogged;
    return (
        <div>
            <Router history = {history}>                     
                <Nav isAdmin = {this.state.isAdmin} isLogged={isLogged} logout={this.logout}/>
                <div className="jumbotron">
                    <div className="container">                      
                                <Switch>
                                    <PrivateRoute exact path='/' component={Home} />
                                    <PrivateRoute exact path='/admin' roles={"Admin"} component={AdminPage} />
                                    <Route path='/holidays' component={holidays} />
                                    <Route path='/about' component={about} />
                                    <Route path='/register' component={RegisterPage} />
                                    <Route path='/login' component={LoginPage} />
                                    <PrivateRoute path='/adminAttUpdt'><AdminAttUpdate id={123}/></PrivateRoute>
                                </Switch>
                    </div>
                </div>
            </Router>
        </div>
    );
    }
}

export default App;