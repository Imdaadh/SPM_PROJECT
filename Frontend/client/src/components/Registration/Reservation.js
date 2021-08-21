import React, { PureComponent } from 'react'

import axios from 'axios'
import './login.css'


import decode from "jwt-decode";

class Reservation extends PureComponent {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            name:'',
            role:'attendee',
            email:'',
            password:'',


        }
    }
    // componentDidMount() {
    //
    //
    //
    //     if(this.state.user===''){
    //         alert('you must login to reserve'+this.state.email)
    //         this.props.history.push('/')
    //     }else{
    //         alert('you must login to aaaaaaaaa'+this.state.email)
    //         this.props.history.push('/login')
    //     }
    //
    // }





    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e){
        e.preventDefault();
        try {
            const users={
                role:this.state.role,
                name:this.state.name,
                email:this.state.email,
                password:this.state.password
            }
            axios.post(`/user/register`,users).then(res => {
                alert(res.data.msg)
                if (res.data.success) {
                    users.role === 'workshop presenter' ? this.props.history.push(`/addWorkshop/${users.email}`)
                        :
                        users.role === 'attendee' ? this.props.history.push(`/payment/${users.email}`)
                            :
                            this.props.history.push('/addFile')
                }
            })
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    render() {
        return (
            <div>

                <br/>
                <br/>
                <div className="login-page"style={{  height: 600, borderColor:"red"}}>
                    <h1>Registration Form</h1>
                    <form  onSubmit={this.onSubmit}   >
                        <div className="form-group" style={{borderColor:"red"}}>
                            <input type="text" className="form-control" style={{borderColor:"red"}} placeholder="Enter Name" name="name" value={this.state.name} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <select    name="role" value={this.state.role} onChange={this.onChange} required={true}>
                                <option value="select the user role" >select the user role</option>

                                <option value="researcher">researcher</option>
                                <option value="attendee" >attendee</option>
                                <option value="workshop presenter">workshop presenter</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" style={{borderColor:"#FF0000"}} placeholder="Enter Email" name="email"  value={this.state.email}  onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" style={{borderColor:"#FF0000"}} placeholder="Enter Password" name="password"  value={this.state.password}  onChange={this.onChange} />
                        </div>

                        <div className="row">
                            <button type="submit" style={{backgroundColor:"#DC3545", border:"none", marginLeft:"20px"}}>submit</button>
                        </div>
                    </form>

                </div>

            </div>
        )
    }
}

export default Reservation