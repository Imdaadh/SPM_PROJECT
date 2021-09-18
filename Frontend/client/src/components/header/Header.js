import React, {useContext, useEffect, useState} from 'react'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import decode from 'jwt-decode';

function Header() {
    const [menu, setMenu] = useState(false)
    const [user, setUser] = useState('')

    const logoutUser = async () =>{
        sessionStorage.clear()
        window.location.href = "/";
    }

    useEffect(() =>{
        const getSession= async () => {
            if(sessionStorage.token){
                setUser(decode(sessionStorage.token).role)

            }
        }
        getSession()
    },[])


    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">ADD Product</Link></li>
                <li><Link to="/create_category">ADD Categories</Link></li>
                <li><Link to="/adminProducts">Products</Link></li>
                <li><Link to="/orderHistory">ORDERS</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>

            </>
        )
    }

    const packageAdminRouter = () =>{
        return(
            <>
                <li><Link to="/create_package">ADD Package</Link></li>
                <li><Link to="/adminPackages">Packages</Link></li>
                <li><Link to="/orderHistory">ORDERS</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>

            </>
        )
    }

    const userRouter = () =>{
        return(
            <>
                <li><Link to="/userProducts">Products</Link></li>
                <li><Link to="/userPackages">Packages</Link></li>
                <li><Link to="/addPayment">Add Payment</Link></li>
                <li><Link to="/getPayments">View Payments</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    const homeRouter = () =>{
        return(
            <>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/userPackagesbeforelogin">Packages</Link></li>
                <li><Link to="/register">REGISTER</Link></li>
                <li><Link to="/login">LOGIN</Link></li>

            </>
        )
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>
            <div className="logo">
                <h1 >
                    <Link to="/">
                        {
                            user==='admin' ? 'AdminUI'
                                : user==='adminP' ? 'AdminUI'
                                : 'MrDev Shop'
                        }
                    </Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                {
                    user==='admin' ? adminRouter()
                        : user==='user' ? userRouter()
                        : user==='adminP' ? packageAdminRouter()
                            : homeRouter()
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>
        </header>
    )
}

export default Header
