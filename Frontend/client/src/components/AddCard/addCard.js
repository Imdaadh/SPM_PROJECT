import React, { Component} from 'react';
import './addCard.css';
import axios from 'axios';



const initialState = {
    cardType:'',
    cardNumber:'',
    cardName:'',
    cvv:'',
    expiryDate:''
}

class AddCard extends Component{

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCardSelect = this.onCardSelect.bind(this);
        this.state = initialState;
    }

    state = {
        cards: [],
        cardlength:1

    };

    componentDidMount() {
        axios
            .get("http://localhost:5000/card/getCardDetails")
            .then((res) => {

                //const payments = res.data.data;
                console.log(res.data);
                 this.state.cardlength = res.data.length;
                 console.log(this.state.cardlength)
                this.setState({ cards: res.data });
                //console.log(products);
                // this.setState({products:res.data.data});
            })
            .catch((err) => err.message);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onCardSelect(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    //sampe

    onSubmit(e) {
        e.preventDefault();
        let card = {
            cardType: this.state.cardType,
            cardNumber: this.state.cardNumber,
            cardName: this.state.cardName,
            cvv:this.state.cvv,
            expiryDate: this.state.expiryDate
        };
        console.log('DATA TO SEND', card)
        axios.post('http://localhost:5000/card/addCardDetail',card)
            .then(response => {

                alert('New Card has been added')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        if (this.state.cardlength==1) {
            return (
                alert('You already have a card'),
                window.location.href="/getCardDetails"
            )
        } else {
            return (
                <div>
                    <center>
                        <div className="login-page" style={{height: 680, borderColor: "teal"}}>
                            <h2>Add Your Card</h2>
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


                                <button type="submit" className="btn btn-primary">Add Card</button>
                            </form>
                        </div>
                    </center>
                </div>
            )
        }}

}
export default AddCard;











