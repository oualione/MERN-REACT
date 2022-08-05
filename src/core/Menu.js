import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { API_URL } from '../config';
import { isAuth } from '../auth/helpers';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Menu(props) {

    //get the number of items from cartReducer to display it on the cart icon

    let countItem = useSelector(state => state.cart.count)

    const location = useLocation();
    const history = useNavigate()

    const isActive = (path) => {

        if (location.pathname === path) {
            return { color: '#262626' }
        } else {
            return { color: '#0c56d0' }
        }

    }

    const SingOut = () => {
        localStorage.removeItem('jwt')
        fetch(`${API_URL}/sign-out`)
            .then(toastr.info('Logged Out', 'Your sign out was successful !', {
                "positionClass": "toast-bottom-left",
            }))
        history('/login');
    }


    // const isAuth = () => {
    //     var jwt = localStorage.getItem('jwt');
    //         if(jwt){
    //             return JSON.parse(jwt);
    //         }
    //         return false;
    // }

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">I-Bay</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    {isAuth() && (
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link style={isActive('/')} className="nav-link active" aria-current="page" to="/">HOME</Link>
                                <Link style={isActive('/dashboard')}
                                    className="nav-link active"
                                    aria-current="page"
                                    to={`${isAuth() && isAuth().user.role === 1 ? '/admin' : '/user'}/dashboard`}>DASHBOARD
                                </Link>
                                <Link style={isActive('/shop')} className="nav-link active" aria-current="page" to="/shop">SHOP</Link>
                                {/* <Link style={isActive('/login')} className="nav-link" to="/login">Features</Link>
                            <Link style={isActive('/signup')} className="nav-link" to="/signup">Pricing</Link> */}
                            </div>
                        </div>
                    )}


                    <div className="d-flex align-items-center">
                        {!isAuth() && (
                            <Fragment>
                                <Link type="button" to="/login" className="btn btn-link px-3 me-2">
                                    Login
                                </Link>
                                <Link type="button" to="/signup" className="btn btn-primary me-3">
                                    Sign up for free
                                </Link>
                            </Fragment>
                        )}

<Link to="/cart" style={{ cursor: 'pointer' }} className="nav-link">
                                     <i className="fas fa-shopping-cart"></i>
                                    <span className="badge rounded-pill bg-dark">{countItem}</span>
                                </Link>


                        {isAuth() && (

                            <Fragment>
                                <span style={{ cursor: 'pointer' }} className="nav-link" onClick={SingOut}>
                                    Sign Out <i className="fas fa-sign-out-alt"></i>

                                </span>
                            </Fragment>

                        )}

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Menu