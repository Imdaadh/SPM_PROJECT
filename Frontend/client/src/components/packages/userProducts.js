import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import './products.css';
import {Link} from "react-router-dom";

function UserProducts() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)



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

                                <Link id="btn_view" to={`/reserve/${product._id}`} style={{width:300}}>
                                    Reserve
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default UserProducts
