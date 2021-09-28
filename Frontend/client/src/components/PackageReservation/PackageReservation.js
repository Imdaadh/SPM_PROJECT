import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import './PackageReservation.css'
import axios from "axios";
import decode from "jwt-decode";
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function Package_Reservation() {

    function handlePReservation (images1,title2,price3,description3) {

        let reservation = {images:images1 ,PackageName:title2, price:price3, description:description3};
        console.log(reservation);
        let total3 = price3* user.day;
        let total= total3;

        try {
            axios.post('http://localhost:5000/packagereservation/addPackageReservation', {...reservation,...user,email,total}) .then(response => {
                alert('Package Reservation added')
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
            const res = await axios.get(`http://localhost:5000/package/getPackage`)
            setProducts(res.data.products)
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
                        <img src={detailProduct.images.url} alt=""/>
                    </div>
                    <div className="box">
                        <div className='row'>
                            <h2> {detailProduct.PackageName} </h2>
                            <span>${detailProduct.price}</span>
                        </div>

                        <p>{detailProduct.description}</p>


                        <input type='number' onChange={onChangeInput} value={user.day} className='days'  name="day" placeholder='Enter the Number of Days'/><br />
                        <input type='date'  onChange={onChangeInput} value={user.date} className='date' name="date" placeholder='enter the date' /><br />
                        <Link to={`/addPayment/${detailProduct.price*user.day}`}>  <Button className="reserve3" endIcon={<AddCircleIcon />} onClick={()=>{handlePReservation(detailProduct.images.url,detailProduct.PackageName, detailProduct.price,detailProduct.description)}}> Reserve Package</Button></Link>
                    </div>
                </div>

            }
        </div>
    );


}

export default Package_Reservation;
