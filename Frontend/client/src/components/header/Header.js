import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import decode from 'jwt-decode';
import './header.css';
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'



class Myheader extends React.Component{

    state={
        user:'',
        email:''



    }

    doLogout() {

        sessionStorage.clear()
        window.location = '/'

    }



    componentDidMount() {

        if(sessionStorage.token){
            this.setState({user:decode(sessionStorage.token).role})
            this.setState({email:decode(sessionStorage.token).email})
        }

    }

    isAuth() {


        if (this.state.user==='admin') {
            return (
                <div>
                    <li className="menu-active" ><a href="/adminProducts"  style={{marginLeft:-10}}><b><u>Dev Car</u></b></a></li>
                <div style={{marginLeft:300,marginTop:-30}}>
                    <li><a href="/create_product">ADD Product</a> </li>
                    <li><a href="/create_category">ADD Categories</a> </li>
                    <li><a href="/adminProducts" >Products</a></li>
                    <li><a href="/orderHistory">ORDERS </a></li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>
                </div>
                </div>
            )
        } else if(this.state.user==='user') {
            return (
                <div>
                    <li className="menu-active" ><a href="/adminProducts"  style={{marginLeft:-90}}><b><u>Dev Car</u></b></a></li>
                <div style={{marginLeft:80,marginTop:-30}}>
                    <li><a href="#">History</a> </li>
                    <li><a href="/userProducts" >Products</a></li>
                    <li><a href="/userPackages">Packages </a></li>
                    <li><a href="/addPayment" >Add Payment</a></li>
                    <li><a href="/getPayments" >View Payments</a></li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>

                </div>
                </div>
            )
        }
        else if(this.state.user==='adminP') {
            return (
                <div>
                    <li className="menu-active" ><a href="/adminPackages"  style={{marginLeft:-180}}><b><u>Dev Car</u></b></a></li>
                    <div style={{marginLeft:300,marginTop:-30}}>
                    <li><a href="/create_package">ADD Package</a> </li>
                    <li><a href="/adminPackages" >Packages</a></li>
                    <li><a href="/orderHistory">ORDERS </a></li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>
                </div>
                </div>


            )
        }
        else {
            return (

                    <div>
                        <li className="menu-active" ><a href="/"  style={{marginLeft:-90,color:"white"}}><b><u>Dev Car</u></b></a></li>
                        <div style={{marginLeft:550,marginTop:-30}}>
                    <li><a href="/">Products</a></li>
                            <li><a href="/userPackagesbeforelogin">Packages</a></li>
                    <li className="buy-tickets"><a href="/register">REGISTER</a></li>
                    <li className="buy-tickets"><a href="/login">LOGIN</a></li>
                </div>
                </div>
            )
        }

    }







    render() {
        return(
            <div>

                <header>
                    <div className="menu" >
                        <img src={Menu} alt="" width="30" />
                    </div>









                        <nav id="nav-menu-container" >
                            <ul className="nav-menu"  style={{color:"red"}} >
                                {this.isAuth()}
                            </ul>
                        </nav>


                </header>

            </div>



        )
    }
}
export default Myheader