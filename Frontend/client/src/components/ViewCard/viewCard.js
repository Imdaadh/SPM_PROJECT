import React, { useRef, withRouter } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


class ViewCard extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        cards: [],

    };


    deleteUser(id){
        axios.delete(`http://localhost:5000/card/deleteCard/${id}`)
            .then(response => {
                alert('Card deleted')
                window.location.reload(false);
            })

    }



    componentDidMount() {
        axios
            .get("http://localhost:5000/card/getCardDetails")
            .then((res) => {
                //const payments = res.data.data;
                console.log(res.data.data);
                this.setState({ cards: res.data });
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
                        marginLeft: 'auto',
                        marginRight:'auto',
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

                        <th
                            style={{
                                color: "white",
                                backgroundColor: "black",
                                borderColor: "black",
                            }}
                        >
                            Actions
                        </th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.cards.map((cards) => {
                        if (cards) {
                            return (
                                <tr>

                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {cards.cardType}
                                    </td>
                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {cards.cardNumber}
                                    </td>
                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {cards.cardName}
                                    </td>
                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {cards.cvv}
                                    </td>
                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >
                                        {cards.expiryDate}
                                    </td>

                                    <td
                                        style={{
                                            color: "white",
                                            backgroundColor: "#555555",
                                            borderColor: "#555555",
                                        }}
                                    >

                                        <Link to={`/getCardUpdate/${cards._id}`}>
                                            <Button  startIcon={<EditIcon />} style={{
                                                backgroundColor: "Green",
                                                width: 50,
                                                height: 40,
                                                color: "white"
                                            }}
                                            ></Button>
                                        </Link>

                                        <Button startIcon={<DeleteIcon />} style={{
                                            // marginLeft: 200,
                                            backgroundColor: "Red",
                                            width: 50,
                                            height: 40,
                                            color: "white",

                                        }}onClick={()=> this.deleteUser(cards._id)}
                                        ></Button>
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

export default ViewCard


