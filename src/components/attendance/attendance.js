import React from 'react';

//importing services required
import {userService} from '../users/user-service';
import {attService} from '../attendance/attendance-service';
 
class Attendance extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            date: new Date(),
            currentUser: userService.currentUserValue,
            message:null,
            error:null,
            response:null,
            entryTime:null,
            exitTime:null
        }
    }
    componentDidMount(){
        if(this.state.currentUser){           
            const user = this.state.currentUser;           
            attService.getById(user._id)
                .then((res) => { 
                    if(res.message){
                       this.setState({message:res.message});
                    }else{
                       this.setState({
                           message:null,
                           entryTime:res.entryTime,
                           exitTime:res.exitTime
                       })
                    }
                    }
                );
        }
        this.timerID = setInterval(
            () => this.tick(),
            1000
          );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
      }
    tick() {
        this.setState({
          date: new Date()
        });
      }
    markAttendance = (e) =>{
        let time = this.state.date.toLocaleTimeString();
        const currentUser = this.state.currentUser;
        if (window.confirm(time + 'Sure!')) {
            e.preventDefault();
            attService.attUpdate(e.target.name, currentUser._id,currentUser.teamName, time,this.state.entryTime,currentUser.email)
                .then((response) => {
                    this.setState({
                        message:null,
                        error: null,
                        response: response.message
                    })                
                        window.location.reload(false);             
                })
                .catch((error) => {
                    this.setState({ error: error })
                }
                );
        }else{
            this.setState({
                response: null,
                error: "Attendance not Updated"
            }
            );
        }
    }
    render(){
        const response = this.state.response;
        const error = this.state.error;
        const entryTime = this.state.entryTime;
        const exitTime = this.state.exitTime;
        let message,button;
        if(entryTime && exitTime){
            message =<p className="alert alert-info h6">{`Entry: ${entryTime}`}<br/>{` Exit: ${exitTime}`}</p> ;
            button = <button  type="button" className="btn btn-dark" disabled> Already updated </button>;
        }else if(entryTime != null && exitTime == null){
           message =<p className="alert alert-info h6">{`Entry: ${entryTime}`}</p>;
           button = <button onClick={this.markAttendance} name="Exit" type="button"  className="btn btn-dark">Exit</button>
        }else{
            message =<p className="alert alert-info md-h6">Attendance not updated yet</p> ;
            button = <button onClick={this.markAttendance} name="Entry" type="button" className="btn btn-dark">Entry </button>;
        }
        return (
                <div className="col-lg-6 col-md-6">
                    <div className="card text-center border-info">
                        <div className="card-footer text-muted" style={{ backgroundColor: "white" }}>
                            {message}
                            {response && <p className="text-primary">{response}</p>}
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                        <div className="card-header">
                            <h5>Attendance</h5>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Current Time</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{this.state.date.toLocaleTimeString()}</h6>
                            <p className="card-text">Update and check your attendance timings and hope you have an nice day</p>
                            <div className="d-grid gap-2 d-md-block">
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            
        )
    }
}

export default Attendance;