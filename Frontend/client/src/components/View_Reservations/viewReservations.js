import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import './viewReservations.css'
import axios from "axios";
import decode from "jwt-decode";
import Loading from "../utils/loading/Loading";


function View_reservations() {

    // const [token] = state.token

    const [loading, setLoading] = useState(false)
    // const [search, setSearch] = state.productsAPI.search
    // const [products, setProducts] = state.productsAPI.products
    // const [callback, setCallback] = state.productsAPI.callback

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [callback, setCallback] = useState(false)
    const [search, setSearch] = useState('')

    const Delete_Reservation= async (id) => {
        try {
            await axios.delete(`http://localhost:5000/reservation/deleteReservation/${id}`)
            alert('Reservation Deleted')
            window.location.reload(false);
        }
        catch(error){
            alert(error);
        };
    }



    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`http://localhost:5000/reservation/getReservation`)
            setProducts(res.data.newReservation)

        }
        getProducts()
    },[callback, search, page])



    if(loading) return <div> <Loading /></div>
    return(
        <>
            <div className="filter_menu">
                <input type="text" value={search} placeholder="Search Your Past Reservations"
                       onChange={e => setSearch(e.target.value.toLowerCase())} />
            </div>

        <div className='app'>
            {

                products.map(product => (
                <div className='details'>
                    <div className='big-img'>
                        <img src={product.images} alt=""/>
                    </div>
                    <div className="box">
                        <div className='row'>
                            <h2> {product.title} </h2>
                            <span>${product.price}</span>
                        </div>

                        <p>{product.description}</p>
                        {/*<p>{product.content}</p>*/}
                        <p>Date: {product.date}</p>
                        <p>Number of Days: {product.day}</p>
                        <div className='row'>
                            <h2>Total Payment: ${product.total} </h2>
                        </div>

                        <button className="reserve7" onClick={()=>Delete_Reservation(product._id)}> Cancel Reservation </button>
                        <Link to={`updateReservation/${product._id}`}> <button className="reserve8"> Update Reservation </button></Link>
                    </div>

                </div>
                ))
                }
        </div>
        </>
    );


}

export default View_reservations;
