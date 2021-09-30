import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import axios from "axios";
import './orders.css';

const PackageOrders= () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <button style={{  marginLeft: 1250 ,backgroundColor:"teal",width:200,height:40,color:"white",marginTop:50}}  onClick={handlePrint} >Download Report</button >
            <ComponentToPrint ref={componentRef} />
        </div>
    );
};
export default PackageOrders



class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            reservation:[]
        }
    }
    componentDidMount(){
        axios.get('/packagereservation/getPackageReservation').then(response =>{
            this.setState({reservation:response.data.newReservation})


            // const res = await axios.get(`http://localhost:5000/reservation/getReservation`)
            // setProducts(res.data.newReservation)
        } )
    }

    render() {
        return (
            <div className="history-page">
                <h2>Package Order Details</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>Email</th>
                        <th>Date of Booked</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.reservation.map(
                            user =>
                                <tr key ={user._id}>
                                    <td>{user.PackageName}</td>
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

