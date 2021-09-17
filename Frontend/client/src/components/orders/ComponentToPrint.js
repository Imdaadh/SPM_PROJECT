import OrderHistory from "./OrderHistory";
import React, { useRef } from 'react';
import './orders.css';
import axios from "axios";
export class ComponentToPrint extends React.PureComponent {


    constructor(props) {
        super(props)
        this.state = {
            reservation:[]
        }
    }
    componentDidMount(){
        axios.get('/reservation/getReservation').then(response =>{
            this.setState({reservation:response.data})
        } )
    }

    render() {
        return (


            <div className="history-page">
                <h2>Reservation Details</h2>




            <table>
                <thead>
                <tr>
                    <th>Car Name</th>
                    <th>Email</th>
                    <th>Date of Booked</th>


                </tr>
                </thead>
                <tbody>
                {
                    this.state.reservation.map(
                        user =>
                            <tr key ={user._id}>
                                <td>{user.title}</td>
                                <td>{user.email}</td>
                                <td>{user.date}</td>

                            </tr>
                    )
                }
                </tbody>


            </table>

            </div>
        );
    }
}

