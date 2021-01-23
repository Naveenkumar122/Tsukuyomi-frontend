import React from 'react';


//import admin components
import Users from './user';
//importing services required
import {userService} from '../users/user-service';
import {attService} from '../attendance/attendance-service';
import {AdLoanService} from '../AdLoan/AdLoan-service';


class AdminPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          search: "",
          adl:null,
          ExitCount:0,
          users:null,
          att:null,
          cards:[
                 {border:"card border-success",text:"text-center text-success",CountType:"EntryCount",key:"Attendance Entry"},
                 {border:"card border-danger",text:"text-center text-danger",CountType:"ExitCount",key:"Attendance Exit"},
                 {border:"card border-success",text:"text-center text-primary",CountType:"LoanCount",key:"LoanReq Entry"},
                 {border:"card border-success",text:"text-center text-info",CountType:"AdvanceCount",key:"Advance Entry"}
                ],
          currentUser: userService.currentUserValue,
          message:null,
          EntryCount:0,
          LoanCount:0,
          AdvanceCount:0,
          error:null
        }
    }
    changeCount = (type,num) =>{
      if(type==='Att'){
          this.setState({
            EntryCount: this.state.EntryCount-num,
            ExitCount:this.state.ExitCount-num
          })
      }
      if(type==='loan'){
        this.setState({
          LoanCount:this.state.LoanCount-num
        })
      }
      if(type==='advance'){
        this.setState({
          AdvanceCount:this.state.AdvanceCount-num
        })
      }
    }
    getAtt = ()=>{
      attService.getAll()
        .then((res) => {
          let EntryCount = 0, ExitCount = 0;
          if (res.length > 0) {
            res.map(ele => {
              if ( ele.Entryupdated === false) {
                EntryCount += 1;
              }
              if ( ele.Exitupdated === false) {
                ExitCount += 1;
              }             
            })
            this.setState({
              EntryCount: EntryCount>ExitCount ? EntryCount:ExitCount,
              ExitCount: EntryCount>ExitCount ? EntryCount:ExitCount,
              att:res
            })
          }
        }
      )
      .catch((err)=>{
        this.setState({
          error:err
        })
      });
    }
    getAdLoan = () =>{
      AdLoanService.getAll()
        .then((res) => {
          let LoanCount = 0, AdvanceCount = 0;
          if (res.length > 0) {
            res.map(ele => {
              if (ele.type === "loan" && ele.isPending === true) {
                LoanCount += 1;
              }
              if (ele.type === "advance" && ele.isPending === true) {
                AdvanceCount += 1;
              }
            })
            this.setState({
              LoanCount: LoanCount,
              AdvanceCount: AdvanceCount,
              adl:res
            })
          }
        }
        )
        .catch((err) => {
          this.setState({
            error: err
          })
        });
    }
    getUser = () =>{
      userService.getAll()
        .then((res) => {
          this.setState({
            users: res
          })
        }
        )
        .catch((err) => {
          this.setState({
            error: err
          })
        });
    }
    componentDidMount(){
        this.getUser();
        this.getAtt();
        this.getAdLoan();
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
  handleChange = event => {
    this.setState({ search: event.target.value });
  };
    render(){
        const cards = this.state.cards.map((e) => {
          return(
          <div className="col-md-3 ">
            <div className={e.border}>
              <div className="card-body">
                <div className={e.text}>
                  <h5 className="card-title"> {e.key} pending:&nbsp;&nbsp;<p className="display-4">{this.state[e.CountType]}</p></h5>
                </div>
              </div>
            </div>
          </div>      
          )
      })
      const user = this.state.users;
      const filteredData =user ? user.filter((data)=>{
        if(this.state.search == null)
            return data
        else if(data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.teamName.toLowerCase().includes(this.state.search.toLowerCase())){
            return data
        }}) : null;
      const tr = (filteredData != null) ? filteredData.map((e, index) => {
        return (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{e.name}</td>
            <td>{e.teamName}</td>
            <td>{e.role}</td>
            <td><button name="Att" key={e._id} type="submit" className="btn" style={{ backgroundColor: "purple" }}><span style={{ color: "white" }}>Update</span></button></td>
            <td><button name="Pay" key={e._id} type="submit" className="btn" style={{ backgroundColor: "purple" }}><span style={{ color: "white" }}>Update</span></button></td>
          </tr>
        )
      }) : null;
        return (
          <div>
            <br /><br />
            { this.state.error && <div className="alert alert-danger text-center">{this.state.error}</div>}
            <div className="row">
              {cards}
            </div>
            <br /><br />
            <div className="card border-secondary">
              {this.state.users && this.state.att && this.state.adl && <Users id={this.state.users.length} users={user} att={this.state.att} adl={this.state.adl} history = {this.props.history} changeCount={this.changeCount}/>}
            </div>
            <br /><br />
          </div>
        )
    }
}

export default AdminPage;