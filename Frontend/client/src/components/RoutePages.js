import React, {useContext, Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from './products/Products'
import Login from './Registration/Login'
import Register from './Registration/Register'
import OrderHistory from './orders/OrderHistory'
import NotFound from './utils/not_found/NotFound'
import CreateProduct from './AddProduct/CreateProduct'
import UserProducts from './products/userProducts'
import Reservation from './Registration/Reservation'
import ProductsBfrLogin from './products/ProductsBefLogin'
import Categories from "./categories/Categories";
import CreatePackage from "./AddPackage/CreatePackage";
import AdminViewPackages from "./packages/adminViewPackages";

import AddPayment from './addPayment/addPayment';
import ViewPayments from './viewPayment/viewPayment';
import UpdatePayment from "./updatePayment/updatePayment";

import View_product from "./view_product/view_product";
 import UserPackages from "./packages/userViewPackages"
 import BeforeLoginPackages from "./packages/packageView"
 import View_reservations from "./View_Reservations/viewReservations";
 import ReservationUpdate from "./View_Reservations/reservationUpdate";
 import Package_Reservation from "./PackageReservation/PackageReservation"
 import View_Preservations from "./PackageReservation/ViewPackageReservation";
import UserProfile from "./UserProfile/userProfile";
import AddCard from "./AddCard/addCard";
import ViewCard from "./ViewCard/viewCard";
import UpdateCard from "./UpdateCard/updateCard";
import PackageOrders from "./orders/packageOrders";
//include payment










function Pages() {




    return (
        <Switch>




            //packages
            <Route path="/adminPackages" exact component={AdminViewPackages} />
            <Route path="/create_package" exact component={CreatePackage} />
            <Route path="/edit_package/:id" exact component={CreatePackage } />
            {<Route path="/userPackages" exact component={UserPackages} />}
            {<Route path="/userPackagesbeforelogin" exact component={BeforeLoginPackages} />}
            <Route path="/packageOrders" exact component={PackageOrders } />


            //user products
            <Route path="/reserve/:id"  component={View_product} />
            <Route path="/userProducts" exact component={UserProducts} />
            <Route path="/reservation" exact component={Reservation} />
            <Route path="/viewreservations" exact component={View_reservations} />
            <Route path="/updateReservation/:id" exact component={ReservationUpdate} />
            <Route path="/package_reservation/:id" exact component={Package_Reservation} />
            <Route path="/view_package_reservation" exact component={View_Preservations} />
            <Route path="/userProfile" exact component={UserProfile} />

            //admin products
            <Route path="/adminProducts" exact component={Products} />
            <Route path="/" exact component={ProductsBfrLogin} />
            <Route path="/create_category" exact component={Categories} />
            <Route path="/create_product" exact component={CreateProduct} />
            <Route path="/edit_product/:id" exact component={CreateProduct } />
            <Route path="/orderHistory" exact component={OrderHistory } />




//sample

            {/*<Route path="/payment" exact component={isLogged ? payment : NotFound} />*/}

            {/*payments*/}
                <Route path="/addPayment/:total" component={AddPayment}/>
                <Route path="/getPayments" component={ViewPayments}/>
                <Route path="/getPaymentUpdate/:id" component={UpdatePayment}/>

                {/*cards*/}
            <Route path="/addCardDetail" component={AddCard}/>
            <Route path="/getCardDetails" component={ViewCard}/>
            <Route path="/getCardUpdate/:id" component={UpdateCard}/>

            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="*" exact component={NotFound} />





        </Switch>
    )
}

export default Pages
