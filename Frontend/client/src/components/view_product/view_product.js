import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import './view_products.css'
import axios from "axios";


function View_product() {

    function handleReservation (images1,title2,price3,description3,content4) {

        let reservation = {images:images1 ,title:title2, price:price3, description:description3, content:content4};
        console.log(reservation);
        try {
             axios.post('http://localhost:5000/reservation/addReservation', {...reservation,...user}) .then(response => {
                 alert('Reservation added')
             })

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    const [user, setUser] = useState({
        day:'',date:''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }


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

                                <input type='number' onChange={onChangeInput} value={user.day} className='days'  name="day" placeholder='Enter the Number of Days'/><br />
                                <input type='date'  onChange={onChangeInput} value={user.date} className='date' name="date" placeholder='enter the date' /><br />
                                <button className="reserve" onClick={()=>{handleReservation(detailProduct.images.url,detailProduct.title, detailProduct.price,detailProduct.description,detailProduct.content)}}> Reserve </button>
                            </div>
                        </div>

                }
            </div>
        );


}

export default View_product;
