import React, { useRef, withRouter } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import {Link} from 'react-router-dom';

const OrderHistory = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    //
    //

    return (
        <div>
            <button
                style={{
                    marginLeft: 200,
                    backgroundColor: "teal",
                    width: 200,
                    height: 40,
                    color: "white",
                    marginTop: 50,
                }}
                onClick={handlePrint}
            >
                Download Report
            </button>
            <ViewPayment ref={componentRef} />
        </div>
    );
};
export default OrderHistory;

class ViewPayment extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        payments: [],

    };


    deleteUser(id){
        axios.delete(`http://localhost:5000/payment/delete/${id}`)
            .then(response => {
                alert('Payment deleted')
                window.location.reload(false);
            })

    }



    componentDidMount() {
        axios
            .get("http://localhost:5000/payment/getPayments")
            .then((res) => {
                //const payments = res.data.data;
                console.log(res.data.data);
                this.setState({ payments: res.data });
                //console.log(products);
                // this.setState({products:res.data.data});
            })
            .catch((err) => err.message);
    }

    render() {
        return (



            <div className="container" style={{ paddingTop: "30px" }}>
                {/* <h1>report</h1> */}
                <p></p>
                {/*<input label="Search Country" onChange={this.onChange}/>*/}
                <Table
                    striped
                    bordered
                    hover
                    variant="dark"
                    style={{
                        marginLeft: 200,
                        width: 900,
                        backgroundColor: "#555555",
                        border: 6,
                    }}
                >
                    <thead>
                    <tr>
                        <th
                            style={{
                                color: "white",
                                backgroundColor: "black",
                                borderColor: "black",
                            }}
                        >
                            Amount
                        </th>
                        <th
                            style={{
                                color: "white",
                                backgroundColor: "black",
                                borderColor: "black",
                            }}
                        >
                            Card Type
                        </th>
                        <th
                            style={{
                                color: "white",
                                backgroundColor: "black",
                                borderColor: "black",
                            }}
                        >
                            Card Number
                        </th>
                        <th
                            style={{
                                color: "white",
                                backgroundColor: "black",
                                borderColor: "black",
                            }}
                        >
                            Card Name
                        </th>
                        <th
                            style={{
                                color: "white",
                                backgroundColor: "black",
                                borderColor: "black",
                            }}
                        >
                            CVV
                        </th>
                        <th
                            style={{
                                color: "white",
                                backgroundColor: "black",
                                borderColor: "black",
                            }}
                        >
                            Expiry Date
                        </th>



                    </tr>
                    </thead>
                    <tbody>
                    {this.state.payments.map((payments) => {
                        if (payments) {
                            return (
                                <tr>
                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {payments.amount}
                                    </td>
                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {payments.cardType}
                                    </td>
                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {payments.cardNumber}
                                    </td>
                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {payments.cardName}
                                    </td>
                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {payments.cvv}
                                    </td>
                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {payments.expiryDate}
                                    </td>

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
                            );
                        }
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}


