import React from 'react';

//importing components
import Attendance from '../attendance/attendance';
import AdLoan from '../AdLoan/AdLoan';

class Home extends React.Component{
    render(){
        return ( 
            <div className="container-fluid">
                <div className="row">
                    <Attendance />
                    <AdLoan />
                </div>
            </div>   
        )
    }
}

export default Home;