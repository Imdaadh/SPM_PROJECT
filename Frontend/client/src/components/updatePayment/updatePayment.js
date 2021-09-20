import React, { Component} from 'react';
import axios from 'axios';
import decode from "jwt-decode";
import '../addPayment/addpayment.css';



class UpdatePayment extends Component{

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPaymentSelect = this.onPaymentSelect.bind(this);
        this.state = {cardType:'',
            cardNumber:'',
            cardName:'',
            cvv:'',
            expiryDate:''
        };
    }
    state={
        email:'',
        payments:[],
    }



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
//sample
    componentDidMount =()=> {
        if(sessionStorage.token){
            this.setState({email:decode(sessionStorage.token).email})
        }
        const id =this.props.match.params.id;
        console.log(this.props.match.params.id)
        axios.get(`http://localhost:5000/payment/getById/${id}`)
            .then(res => {
                // this.setState({...this.state, book: res.data})

                this.setState({
                    cardType: res.data.cardType,
                    cardNumber: res.data.cardNumber,
                    cardName: res.data.cardName,
                    cvv: res.data.cvv,
                    expiryDate: res.data.expiryDate,

                })
            })
            .catch(err => {
                console.log("Error from UpdateBookInfo");
            })

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
            expiryDate: this.state.expiryDate,
            email:this.state.email
        };
        console.log('DATA TO SEND', payment)

        axios.put('http://localhost:5000/payment/updatePayment/'+this.props.match.params.id,payment)
            .then(response => {
                alert("Payment Updated");
                window.location.href="/getPayments";
                // alert('Payment added')
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
                    <div className="login-page"  style={{  height: 680,borderColor:"teal"}}>
                        <h2>Update Payment</h2>
                        <form onSubmit={this.onSubmit}>
                            <br></br>




                            <input
                                type="text"
                                className="form-control"
                                id="subjectName"
                                name="cardType"
                                required={true}
                                placeholder="Enter Card Type"
                                value={this.state.cardType}
                                onChange={this.onChange}
                            />





                            <input
                                type="text"
                                className="form-control"
                                id="subjectName"
                                name="cardNumber"
                                required={true}
                                placeholder="Enter Card Number"
                                value={this.state.cardNumber}
                                onChange={this.onChange}
                            />



                            <input
                                type="text"
                                className="form-control"
                                id="subjectAmount"
                                name="cardName"
                                required={true}
                                placeholder="Enter Card Name"
                                value={this.state.cardName}
                                onChange={this.onChange}
                            />



                            <input
                                type="text"
                                className="form-control"
                                id="subjectAmount"
                                name="cvv"
                                required={true}
                                placeholder="Enter CVV"
                                value={this.state.cvv}
                                onChange={this.onChange}
                            />



                            <input
                                type="text"
                                className="form-control"
                                id="subjectAmount"
                                name="expiryDate"
                                required={true}
                                placeholder="Enter Expiry Date"
                                value={this.state.expiryDate}
                                onChange={this.onChange}
                            />



                            <button type="submit" className="btn btn-primary">Confirm</button>
                        </form>
                    </div>
                </center>
            </div>
        )
    }

}

export default UpdatePayment

