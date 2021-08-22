import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import './view_products.css'


function View_product() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;
            return(

            <div className='app'>
                {

                        <div className='details'>
                            <div className='big-img'>
                                <img src={detailProduct.images.url} alt=""/>
                            </div>
                            <div className="box">
                                <div className='row'>
                                    <h2> {detailProduct.title} </h2>
                                    <span>${detailProduct.price}</span>
                                </div>

                                <p>{detailProduct.description}</p>
                                <p>{detailProduct.content}</p>



                                <input type='number'  className='days'  placeholder='Enter the Number of Days'/><br />
                                <input type='date'  className='date' placeholder='enter the date' /><br />
                                <button className="reserve"> Reserve </button>

                            </div>
                        </div>

                }
            </div>
        );


}
export default View_product;
