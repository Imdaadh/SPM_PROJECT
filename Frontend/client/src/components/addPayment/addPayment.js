import React, { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import Select from 'react-select';
import axios from 'axios';
//example

const initialState = {
    cardType:'',
    cardNumber:'',
    cardName:'',
    cvv:'',
    expiryDate:''
}

 class CreatePayment extends Component{

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPaymentSelect = this.onPaymentSelect.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('http://localhost:2000/payment/')
            .then(response => {
                this.setState({payments:response.data.data},()=> {
                    let data = [];
                    this.state.payments.map((item,index) => {
                        let payment = {
                            value:item._id,
                            label:item.name
                        }
                        data.push(payment)
                    });
                    this.setState({options:data});
                })
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onPaymentSelect(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let payment = {
            cardType: this.state.cardType,
            cardNumber: this.state.cardNumber,
            cardName: this.state.cardName,
            cvv:this.state.cvv,
            expiryDate: this.state.expiryDate
        };
        console.log('DATA TO SEND', payment)
        axios.post('http://localhost:5000/payment/addPayment',payment)
            .then(response => {
                alert('Payment added')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render(){
        return(
<div>
    <center>
            <div className="container">
                <h1>Add Payment</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group w-50">
                        <label htmlFor="subjectName" className="form-label">Card Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="subjectName"
                            name="cardType"
                            value={this.state.cardType}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group w-50">
                        <label htmlFor="subjectName" className="form-label">Card Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="subjectName"
                            name="cardNumber"
                            value={this.state.cardNumber}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group w-50">
                        <label htmlFor="subjectAmount" className="form-label">Card Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="subjectAmount"
                            name="cardName"
                            value={this.state.cardName}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group w-50">
                        <label htmlFor="subjectAmount" className="form-label">CVV</label>
                        <input
                            type="text"
                            className="form-control"
                            id="subjectAmount"
                            name="cvv"
                            value={this.state.cvv}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group w-50">
                        <label htmlFor="subjectAmount" className="form-label">Expiry Date</label>
                        <input
                            type="number"
                            className="form-control"
                            id="subjectAmount"
                            name="expiryDate"
                            value={this.state.expiryDate}
                            onChange={this.onChange}
                        />
                    </div>

                    {/*<Select*/}
                    {/*    options={this.state.options}*/}
                    {/*    onChange={this.onPaymentSelect()}*/}
                    {/*    className="basic-multi-select"*/}
                    {/*    isMulti*/}
                    {/*/>*/}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
    </center>
</div>
        )
    }

}
export default CreatePayment;











