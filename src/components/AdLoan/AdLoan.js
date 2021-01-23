import React from 'react';

//importing services required
import {userService} from '../users/user-service';
import {AdLoanService} from '../AdLoan/AdLoan-service';

class AdLoan extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user : userService.currentUserValue,
            type:'loan',
            amount:0,
            message:null,
            error:null
        }
    }
    change = (event) => {
        console.log(this.state);
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
    update= (e)=>{
        e.preventDefault();
        AdLoanService.Entry(this.state.user._id, this.state.user.email, this.state.amount, this.state.type)
            .then(res => this.setState({error:null,message:res.message,amount:null}))
            .catch(err => this.setState({message:null,error:err,amount:null}));
    }
    render(){
        return (
                <div className="col-lg-6 col-md-6 text-center">                    
                    <div className="card border-info">
                    <div className="card-footer text-muted" style={{ backgroundColor: "white" }}>
                            {this.state.message && <p  className="alert alert-info ">{this.state.message}</p>}
                            {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
                        </div> 
                        <div className="card-header">
                        <h5>Advance and Loan Entry</h5>
                        </div>
                        <div className="card-body">
                            <div className="text text-center">
                                
                                <form onSubmit={this.update}>
                                    <select id className="form-select" id="inputGroupSelect02" name="type" onChange={this.change}>
                                        <option value="loan">Loan</option>
                                        <option value="advance">Advance</option>
                                    </select>
                                        <input type="text" name="amount" className="form-control" onChange={this.change} value={this.state.amount}/>
                                        <button type="submit" className="btn" style={{ backgroundColor: "purple" }}><span style={{ color: "white" }}>Submit</span></button>
                                </form>
                                </div>
                            </div>
                        </div>
                         
                    </div>
        )
    }
}

export default AdLoan;