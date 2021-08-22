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
                    <li><a href="/create_product">ADD Product</a> </li>
                    <li><a href="/create_category">ADD Categories</a> </li>
                    <li><a href="/adminProducts" >Products</a></li>
                    <li><a href="/orderHistory">ORDERS </a></li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>
                </div>
            )
        } else if(this.state.user==='user') {
            return (
                <div>
                    <li><a href="#">History</a> </li>
                    <li><a href="/userProducts" >Products</a></li>
                    <li><a href="#">Packages </a></li>
                    <li><a href="/addPayment" >Add Payment</a></li>
                    <li><a href="/getPayments" >View Payments</a></li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>

                </div>
            )
        }
        else if(this.state.user==='adminP') {
            return (
                <div>
                    <li><a href="/create_package">ADD Package</a> </li>
                    <li><a href="/adminPackages" >Packages</a></li>
                    <li><a href="/orderHistory">ORDERS </a></li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>
                </div>


            )
        }  else if(this.state.user==='researcher') {
            return (
                <div>
                    <li className="menu-active"><a href="/">Home</a></li>
                    <li><a href="/aboutUs">About Us</a></li>
                    <li><a href="/userAddRP"> ADD FILE</a> </li>
                    <li><a href="/userViewRP"> VIEW FILE</a> </li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>

                </div>


            )
        } else if(this.state.user==='reviewer') {
            return (
                <div>
                    <li className="menu-active"><a href="#">reviewer UI</a></li>
                    <li><a href="/ReviewerViewWorkshop"> Workshop</a> </li>
                    <li><a href="/reviewerViewRP"> RESEARCH PAPER</a> </li>
                    <li><a href="/reviewerViewTemplate"> TEMPLATES </a> </li>
                    <li className="buy-tickets"  onClick={this.doLogout}><a href="/">Logout</a></li>
                </div>


            )
        }

        else {
            return (
                <div>

                    <li><a href="/">Products</a></li>
                    <li className="buy-tickets"><a href="/register">REGISTER</a></li>
                    <li className="buy-tickets"><a href="/login">LOGIN</a></li>
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