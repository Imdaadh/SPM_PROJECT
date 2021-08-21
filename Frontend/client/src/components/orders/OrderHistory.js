import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './orders.css';



function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)

                    console.log("ssssssssssss")
                    console.log(history)

                }
            }
            getHistory()
        }
    },[token, isAdmin, setHistory])

    return (
        <div className="history-page">
            <h2>Reservation Details</h2>

            <button style={{  marginLeft: 1300 ,backgroundColor:"teal",width:200,height:40,color:"white"}}>Download Report</button>

            <h4>You have {history.length} orders</h4>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>Date of Booked</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                               
                                <td>{items.name}</td>
                                <td>{items.email}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td>View</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
