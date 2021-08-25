import React , {Component} from "react";
import axios from 'axios';
import {Card, Modal,Button,Table} from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.css';
//react bootstrap!!!
class viewPayment extends Component{

    constructor(props) {
    super(props);
}
state = {
    payments:[],
}

componentDidMount() {
    axios.get('http://localhost:5000/payment/getPayments').
    then(res => {
        //const payments = res.data.data;
        console.log(res.data.data);
        this.setState({ payments: res.data });
        //console.log(products);
        // this.setState({products:res.data.data});
    }).catch(err => err.message)
}

render(){

    return(

        <div className='container' style={{paddingTop:'30px'}}>
            <Button variant="danger">Generate Report</Button>
            <p></p>

            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Card Type</th>
                    <th>Card Number</th>
                    <th>Card Name</th>
                    <th>CVV</th>
                    <th>Expiry Date</th>
                </tr>
                </thead>
                <tbody>

                {this.state.payments.map((payments,index) => (
                    <tr>
                        <td>{payments.cardType}</td>
                        <td>{payments.cardNumber}</td>
                        <td>{payments.cardName}</td>
                        <td>{payments.cvv}</td>
                        <td>{payments.expiryDate}</td>
                    </tr>

                ))}
                </tbody>
            </Table>

        </div>
    )
}

}

export default viewPayment

