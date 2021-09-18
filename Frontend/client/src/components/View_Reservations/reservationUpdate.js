import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import './reservationUpdate.css'
import axios from "axios";
import decode from "jwt-decode";



function Update_Reservation() {

    function handleReservation (id,price,numberofdays,date) {

        let reservation = {day:numberofdays,date:date};
        console.log(reservation);
        let total3 = price * numberofdays;
        let total= total3;

        try {
            axios.put(`http://localhost:5000/reservation/updateReservation/${id}`, {...reservation,email,total}) .then(response => {
                alert('Updated Successfully')
            })
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const [email, setEmail] = useState('')
    // const [total, setTotal] = useState(0)

    const [products, setProducts] = useState([])
    const params = useParams()
    const state = useContext(GlobalState)
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
        if(sessionStorage.token){
            setEmail(decode(sessionStorage.token).email)
        }
        const getProducts = async () => {
            const res = await axios.get(`http://localhost:5000/reservation/getReservation`)
            setProducts(res.data.newReservation)
            if(params.id){
                products.forEach(product => {
                    if(product._id === params.id) setDetailProduct(product)
                })
            }
        }
        getProducts()
    },[params.id, products])

    if(detailProduct.length === 0) return null;
    return(

        <div className='app'>
            {

                <div className='details'>
                    <div className='big-img'>
                        <img src={detailProduct.images} alt=""/>
                    </div>
                    <div className="box">
                        <div className='row'>
                            <h2> {detailProduct.title} </h2>
                            <span>${detailProduct.price}</span>
                        </div>

                        <p>{detailProduct.description}</p>
                        <p>{detailProduct.content}</p>

                        <input type='number' value={user.day} onChange={onChangeInput} className='days'  name="day" placeholder='Enter the Number of Days'/><br />
                        <input type='date'  onChange={onChangeInput} value={user.date} className='date' name="date" placeholder='enter the date' /><br />
                        <Link to={`/addPayment/${detailProduct._id}`}> <button className="reserve8"  onClick={()=>{handleReservation(detailProduct._id,detailProduct.price,user.day,user.date)}}>Update Reservation</button></Link>

                    </div>

                </div>

            }
        </div>
    );


}

export default Update_Reservation;
