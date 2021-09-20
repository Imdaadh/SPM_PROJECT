import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import './viewReservations.css'
import axios from "axios";
import decode from "jwt-decode";
import Loading from "../utils/loading/Loading";
import './feedback.css';
import Button from '@mui/material/Button';
import FeedbackIcon from '@mui/icons-material/Feedback';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function FeedbackModal({ closeModal }) {

    const [user, setUser] = useState({
        feedback:''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }


    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            let feedback= user.feedback;
            await axios.post('http://localhost:5000/feedback/submitFeedback', feedback)
            alert('successfully submitted the feedback')

        } catch (err) {
            alert(err.response.data.msg)
        }
    }



    return (
        <div className="modalBackground">
            < form onSubmit={handleSubmit}>
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => {closeModal(false);}} >X</button>
                </div>
                <div className="title">
                    <h1>Feel Free To Share Your Thoughts</h1>
                </div>
                <div>
                    <textarea className='days2' name="feedback" value={user.feedback} onChange={onChangeInput} placeholder='Type Your Feedback Here'></textarea>
                </div>

                <div className="footer">
                    <Button type='submit' endIcon={<KeyboardArrowDownIcon />} startIcon={<FeedbackIcon />}> Feedback </Button>
                </div>
            </div>
            </form>
        </div>
    );
}

export default FeedbackModal;