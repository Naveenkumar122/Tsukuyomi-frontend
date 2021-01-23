import React from "react";

//importing components
import AdminAttUpdate from "./AdminAttUpdate";

class Users extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            users:props.users,
            userMap:null,
            att:props.att,
            adl:props.adl,
            changeCount:props.changeCount,
            search:"",
            isTable:true,
            ref_id:null,
            ref_name:null,
            ref_email:null
        }
    }
    componentDidMount(){
        let users = this.state.users;
        let att = this.state.att;
        let adl = this.state.adl;
        let userMap = [];
        if(users){
            users.map((ele) => {
                userMap.push(ele.email);
                ele.attCount = 0;
                ele.adLCount = 0;
                ele.att = {};
                ele.adl = {};
            });
            if(att){
             att.map(ele => {
                if ( ele.Entryupdated === false) {
                    users[userMap.indexOf(ele.empEmail)].attCount += 1;
                }
                if (ele.Exitupdated === false) {
                    users[userMap.indexOf(ele.empEmail)].attCount += 1;
                } 
                if(ele.Entryupdated === false || ele.Exitupdated === false){
                    users[userMap.indexOf(ele.empEmail)]['att'][ele.Attdate] = ele ;
                }        
              })
            
              this.setState({
                att:att});
            }
            if(adl){
             adl.map((ele,index) =>{
                 if(ele.isPending === true){
                     users[userMap.indexOf(ele.empEmail)].adLCount += 1;
                     users[userMap.indexOf(ele.empEmail)]['adl'][index] = ele ;
                 }
             })
             this.setState({
                adl:adl})
            }
            this.setState({
                users: users,
                userMap:userMap
            });
        }
    }
    changeState = (email,type,num,key) =>{
        let users = this.state.users;
        let userMap = this.state.userMap;        
           if(type==="Att"){
                delete users[userMap.indexOf(email)]['att'][key];
                users[userMap.indexOf(email)].attCount -= num;
                this.props.changeCount(type,num/2);
           }else{
               delete users[userMap.indexOf(email)]['adl'][key];
               users[userMap.indexOf(email)].adLCount -= num;
               this.props.changeCount(type,num);
           }    
        this.setState({
            users:users
        })
        
    }
    changeTable = () =>{
        this.setState({
            isTable: !this.state.isTable
        })
    }
    change =(e)=>{
        this.setState({
            isTable: !this.state.isTable
        })
        if(e.target.id != null && e.target.name != null){
            const ID = e.target.id.split(',');
            this.setState({
                ref_id:ID[0],
                ref_email:ID[1],
                ref_name:e.target.name
            })
        }     
    }
    handleChange = (event) => {
        this.setState({ search: event.target.value });
      };
    render(){
        const user = this.state.users;
        const filteredData = user ? user.filter((data) => {
            if (this.state.search == null)
                return data
            else if (data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.teamName.toLowerCase().includes(this.state.search.toLowerCase())) {
                return data
            }
        }) : null;
        const tr = (filteredData != null) ? filteredData.map((e, index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{e.name}</td>
                    <td>{e.teamName}</td>
                    <td>{e.role}</td>
                    <td>
                        <button onClick={this.change} email={e.email} name="Att"  id={[e._id,e.email]} type="submit" className="btn text-light" style={{ backgroundColor: "purple" }} disabled={e.attCount === 0}>
                            Update <span className={e.attCount === 0?"badge bg-secondary":"badge bg-danger"}>{e.attCount}</span>
                        </button>
                    </td>
                    <td>
                        <button onClick={this.change} email={e.email} name="Pay" id={[e._id,e.email]} type="submit" className="btn text-light" style={{ backgroundColor: "purple" }} disabled={e.adLCount === 0}>
                           Update <span className={e.adLCount === 0?"badge bg-secondary":"badge bg-danger"}>{e.adLCount}</span>
                        </button>
                    </td>
                </tr>
            )
        }) : null;
        const table = ()=>{
        return(
            <div>
                <div className="card-header">
                    <div className="d-flex flex-row-reverse">
                        <input className="form-control" style={{ width: "65%" }} value={this.state.search} onChange={this.handleChange} placeholder="Input to search" />
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
                                    <th scope="col">Role</th>
                                    <th scope="col">Attendance</th>
                                    <th scope="col">PayRoll</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tr}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
        }
        const isTable = this.state.isTable;
        const id = this.state.ref_id;
        const type = this.state.ref_name;
        const userMap = this.state.userMap;
        const email = this.state.ref_email;
        return(
            <div>
                {isTable ? table(): <AdminAttUpdate id={id} type={type} User={user[userMap.indexOf(email)]} change = {this.changeTable} changeState={this.changeState}/>}
            </div>
        )
    }
}

export default Users;