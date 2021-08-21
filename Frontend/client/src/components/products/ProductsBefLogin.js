import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import './products.css';
import {Link} from "react-router-dom";

function ProductsBfrLogin() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)

    const Login = () => {
        alert('you must login to reserve a vechile')
        window.location.href = "/login";
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
            <Filters />
            <div className="products">
                {
                    products.map(product => (
                        <div className="product_card" key={product._id}>
                            <img src={product.images.url} alt="" />
                            <div className="product_box">
                                <h2 title={product.title}>{product.title}</h2>
                                <span>${product.price}</span>
                                <p>{product.description}</p>
                            </div>
                            <div className="row_btn">
                                <Link id="btn_view" to="#!"
                                      onClick={() =>Login()} style={{width:300}}>
                                    RESERVE
                                </Link>

                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default ProductsBfrLogin
