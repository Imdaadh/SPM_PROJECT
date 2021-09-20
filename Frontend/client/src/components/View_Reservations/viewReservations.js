import React, {useContext, useState, useEffect, useRef} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import './viewReservations.css'
import axios from "axios";
import decode from "jwt-decode";
import Loading from "../utils/loading/Loading";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FeedbackModal from "./feedback";
import {useReactToPrint} from "react-to-print";
import ReactToPrint from "react-to-print";


const Example = () => {
    const componentRef = useRef();
    return (
        <div>
            <ReactToPrint

                content={() => componentRef.current}
                trigger={() =>
                    // <Button className="reserve12"  style={{marginBottom:-200}}>Summary</Button>
                    <div className='app2'>
                        <div className="box2">
                            <Button className="reserve13" endIcon={<SummarizeIcon />} >Summary</Button>
                        </div>
                    </div>
                }
            />
            <ComponentToPrint ref={componentRef} />
        </div>
    );
}


const ComponentToPrint = React.forwardRef((props, ref) => {

// function ComponentToPrint() {



    // const [token] = state.token

    const [loading, setLoading] = useState(false)
    // const [search, setSearch] = state.productsAPI.search
    // const [products, setProducts] = state.productsAPI.products
    // const [callback, setCallback] = state.productsAPI.callback
    //For Modal
    const [modalOpen, setModalOpen] = useState(false);

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

            <div className='app2'>
                    <div className="box2">
                    <Button className="reserve12" endIcon={<FeedbackIcon />} onClick={() => { setModalOpen(true);}}> FeedBack</Button>
                    </div>
            </div>
            {modalOpen && <FeedbackModal closeModal={setModalOpen} />}
            <div className='app' ref={ref}>
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

                        <Button className="reserve7" endIcon={<DeleteIcon />} onClick={()=>Delete_Reservation(product._id)}> Cancel Reservation </Button>
                        <Link to={`updateReservation/${product._id}`}> <Button endIcon={<EditIcon />} className="reserve8"> Update Reservation </Button></Link>


                    </div>
                    {/*<Button className="reserve8" endIcon={<SummarizeIcon />} >  Summary</Button>*/}

                </div>

                ))
                }
        </div>


        </>
    );


})




export default Example;

// export default View_reservations

