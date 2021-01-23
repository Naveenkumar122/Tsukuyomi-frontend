import {Link} from "react-router-dom";

const Nav = ({isAdmin,isLogged,logout}) =>{
     return (
         <div>
             <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "purple" }}>
                 <div className="container-fluid">
                     <Link to="/" className="navbar-brand">Tsukuyomi</Link>
                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon"></span>
                     </button>
                     <div class="collapse navbar-collapse" id="navbarNav">
                         <div className="navbar-nav">
                            <div className="nav-item">
                            {isAdmin && <Link className="nav-link" to="/admin">Admin</Link>}</div>
                             <div className="nav-item">
                                 <Link className="nav-link" to="/about">About</Link></div>
                             <div className="nav-item">
                                 <Link className="nav-link" to="/holidays">Holidays</Link></div>
                             <div className="nav-item">
                            {isAdmin  && <Link className="nav-link" to="/register">Register</Link>}
                            </div>
                             <div className="nav-item">
                            {isLogged && <Link onClick={logout} className="nav-link" to='#'>Logout</Link>}
                            </div>
                         </div>
                     </div>
                 </div>
             </nav>
         </div>
     )
}

export default Nav;