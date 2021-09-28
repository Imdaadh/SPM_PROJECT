import React, {useContext, useEffect, useRef, useState} from 'react'

import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from '../products/Filters'
import '../products/products.css';
import {Link} from "react-router-dom";
import { Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Button from "@mui/material/Button";
import SummarizeIcon from "@mui/icons-material/Summarize";





const ViewPayment = () => {
    const componentRef = useRef();
    return (
        <div>
            <ReactToPrint

                content={() => componentRef.current}
                trigger={() =>
                    // <Button className="reserve12"  style={{marginBottom:-200}}>Summary</Button>
                    <div className='app2'>
                        <div className="box2">
                            <Button className="reserve13" endIcon={<SummarizeIcon />} style={{width:300,marginLeft:-970,backgroundColor:'teal'}} >Generate Report</Button>
                        </div>
                    </div>
                }
            />
            <ComponentToPrint ref={componentRef} />
        </div>
    );
}









const ComponentToPrint = React.forwardRef((props, ref) => {


    // const [token] = state.token

    const [loading, setLoading] = useState(false)
    // const [search, setSearch] = state.productsAPI.search
    // const [products, setProducts] = state.productsAPI.products
    // const [callback, setCallback] = state.productsAPI.callback

    const [payments, setPayments] = useState([])
    const [page, setPage] = useState(1)
    const [callback, setCallback] = useState(false)
    const [search, setSearch] = useState('')


    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`http://localhost:5000/payment/getPayments?limit=${page*18}&cardName[regex]=${search}`)
            setPayments(res.data.products)

        }
        getProducts()
    },[callback, search, page])


    if(loading) return <div><Loading /></div>
    return (
        <>
            <div className="filter_menu">
                <input type="text" value={search} placeholder="Enter your search!"
                       onChange={e => setSearch(e.target.value.toLowerCase())} />
            </div>
            <div className="container" style={{ paddingTop: "30px" }}>
                {/* <h1>report</h1> */}
                <p></p>
                {/*<input label="Search Country" onChange={this.onChange}/>*/}
                <div  ref={ref}>
                    <div className="history-page">

                        <table  style={{
                            backgroundColor: "#555555",
                            width:1000,
                            border: 6,
                            marginTop:100
                        }}>
                            <thead>
                            <tr>
                                <th style={{ color: "white", backgroundColor: "black", borderColor: "black",}}>Amount</th>
                                <th style={{ color: "white", backgroundColor: "black", borderColor: "black",}}>Card Type</th>
                                <th style={{ color: "white", backgroundColor: "black", borderColor: "black",}}>Card Number</th>
                                <th style={{ color: "white", backgroundColor: "black", borderColor: "black",}}>Card Name</th>
                                <th style={{ color: "white", backgroundColor: "black", borderColor: "black",}}>CVV</th>
                                <th style={{ color: "white", backgroundColor: "black", borderColor: "black",}}>Expire Date</th>
                                <th style={{ color: "white", backgroundColor: "black", borderColor: "black",}}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                payments.map(payments => (


                                    <tr key={payments._id}>
                                        <td  style={{ color: "white",backgroundColor: "#555555",borderColor: "#555555",}}>{payments.amount}</td>
                                        <td  style={{ color: "white",backgroundColor: "#555555",borderColor: "#555555",}}>{payments.cardType}</td>
                                        <td  style={{ color: "white",backgroundColor: "#555555",borderColor: "#555555",}}>{payments.cardNumber}</td>
                                        <td  style={{ color: "white",backgroundColor: "#555555",borderColor: "#555555",}}>{payments.cardName}</td>
                                        <td  style={{ color: "white",backgroundColor: "#555555",borderColor: "#555555",}}>{payments.cvv}</td>
                                        <td  style={{ color: "white",backgroundColor: "#555555",borderColor: "#555555",}}>{payments.expiryDate}</td>

                                        <td
                                            style={{
                                                color: "white",
                                                backgroundColor: "#555555",
                                                borderColor: "#555555",
                                            }}
                                        >

                                            <Link to={`/getPaymentUpdate/${payments._id}`}>
                                                <button  style={{
                                                    backgroundColor: "Green",
                                                    width: 50,
                                                    height: 40,
                                                    color: "white"
                                                }}
                                                >Update</button>
                                            </Link>

                                            <button style={{
                                                // marginLeft: 200,
                                                backgroundColor: "Red",
                                                width: 50,
                                                height: 40,
                                                color: "white",

                                            }}onClick={()=> this.deleteUser(payments._id)}
                                            >Delete</button>
                                        </td>

                                    </tr>

                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
})
export default ViewPayment
