import React from "react";
import { attService } from "../attendance/attendance-service";
import { AdLoanService } from "../AdLoan/AdLoan-service";

class AdminAttUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            type: props.type,
            users: props.User,
            open: false,
            change: props.change,
            message:null, 
            error:null
        }
    }
    updtAtt = (event,key,type) => {
        let service = (type==='Att')?attService:AdLoanService;
        service.updateById(event.target.id, event.target.name)
            .then(res => this.setState({ error: null, message: res.message, amount: null }))
            .catch(err => this.setState({ message: null, error: err, amount: null }));
        this.props.changeState(this.state.users.email,type,(type==='Att')?2:1,key)
    }

    goback = () => {
        this.props.change();
    }
    render() {
        const type = this.state.type;
        const users = this.state.users;
        const updtTable= (data) => {
            const name = data.name;
            const team = data.teamName;
            const keyData =(type==='Att')? data.att:data.adl;
            const keys = Object.keys(keyData);
            return (
                <div>
                    <div className="card-header">
                        {this.state.message && 
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            {this.state.message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        }
                        {this.state.error && 
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {this.state.error}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        }
                        <div onClick={this.goback} className="d-flex flex-row-reverse">
                            <button type="button" className="btn btn-outline-danger">
                               <i className="fas fa-backspace"></i>
                                Back
                            </button>
                        </div>


                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table ">
                                    <thead>
                                        <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Team</th>
                                        <th scope="col">{type === 'Att' ? "Date" : 'Type'}</th>
                                        <th scope="col">{type === 'Att' ? "Entry" : 'Amount'}</th>
                                        {type === 'Att' && <th scope="col">Exit</th>}
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            keys && keys.map((ele, index) => {
                                                {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{name}</td>
                                                            <td>{team}</td>
                                                            <td>{type==='Att' ? ele: keyData[ele].type}</td>
                                                            <td>{type==='Att' ? keyData[ele].Entry: keyData[ele].amount}</td>
                                                            {type==='Att' && <td>{keyData[ele].Exit!=null ? keyData[ele].Exit : "6.00.00 PM" }</td>}
                                                            <td>
                                                                <div className="row">
                                                                    <div onClick={(event) => { this.updtAtt(event, ele, (type==='Att')?type:keyData[ele].type) }} className="col">
                                                                        <button key={keyData[ele]._id} id={keyData[ele]._id} name="ok" className='btn btn-success'><i className="fas fa-check fa-sm"></i></button>
                                                                    </div>
                                                                    <div onClick={(event) => { this.updtAtt(event, ele, (type==='Att')?type:keyData[ele].type) }} className="col">
                                                                        <button key={keyData[ele]._id} id={keyData[ele]._id} name="notOk" className='btn btn-danger'><i className="fas fa-times  fa-sm"></i></button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            )
        }
        const component = updtTable(users) ;
        return (
                    <div>
                        {component}
                    </div>
        )
    }
}

export default AdminAttUpdate;