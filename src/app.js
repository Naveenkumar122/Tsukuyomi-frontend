import React from 'react';
import { BrowserRouter as Router,Route, Switch,Link} from 'react-router-dom';

//importing the required components
import {history} from './components/middleware/history';
import PrivateRoute from './components/middleware/PrivateRoute'
import home from './components/home';
import holidays from './components/holidays';
import about from './components/about';
import login from './components/users/login';
import register from './components/users/register';

class  App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }
    componentDidMount(){
        if(localStorage.getItem('user')){
            this.setState({
                currentUser:localStorage.getItem('user'),
            })
        }
    }
    logout(){
        localStorage.removeItem('user');
        history.push('/'); 
        window.location.reload(false);   
    }
    render(){
    return (
        <Router history={history}>
            <div className="App">
                <nav className="nav-wrapper blue darken-3">
                    <div className="container">
                        <a href="/" className="brand-logo">Tsukiyomi</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>{this.state.isAdmin && <Link to="/admin">Admin</Link>}</li>
                            <li><Link to="/holidays">Holidays</Link></li>
                            <li><a href="/about">About</a></li>
                            <li>{this.state.currentUser == null && <Link to="/register">Register</Link>}</li>
                            <li><a onClick={this.logout}>Logout</a></li>
                        </ul>
                    </div>
                </nav> 
                <Switch>           
                    <PrivateRoute exact path='/' component={home} />
                    <Route path='/holidays' component={holidays} />
                    <Route path='/about' component={about} />
                    <Route path='/login' component={login} /> 
                    <Route path='/register' component={register}/>
                </Switch>              
            </div>
        </Router>
    );
  }
}

export default App;