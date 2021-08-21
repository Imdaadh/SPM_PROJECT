import React, { PureComponent } from 'react'
import axios from 'axios'

import './login.css'
import decode from "jwt-decode";


class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            email:'',
            password:'',
            loginUser:'',
            name:'',
            userrole:''
        }
    }
    componentDidMount() {
        if(sessionStorage.token){
            this.setState({userrole:decode(sessionStorage.token).role})
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e){
        e.preventDefault();
        try {
            const users={
                email:this.state.email,
                password:this.state.password
            }
            axios.post(`/user/login`,users).then(res=>{
                    if (res.data.success){
                        alert(res.data.role)
                        this.props.history.push('/')
                    }else{
                        sessionStorage.setItem("token",res.data.accessToken)
                        if (res.data.role==='admin') {
                            alert("welcome"+res.data.role)
                            this.props.history.push('/adminProducts')
                        }else if(res.data.role==='user'){
                            alert("welcome"+res.data.role)
                            this.props.history.push('/userProducts')
                        }
                        else if(res.data.role==='adminP'){
                            alert("welcome"+res.data.role)
                            this.props.history.push('/userProducts')
                        }
                    }
                }
            )
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    render() {
        return (
            <div>

                <br/>
                <br/>
                <div className="login-page" style={{borderColor:"red",marginTop:150}}>
                    <h1>LOGIN FORM </h1>
                    <form  onSubmit={this.onSubmit} style={{borderColor:"red"}}>
                        <div className="form-group" style={{borderColor:"red"}}>
                            <input type="text" className="form-control"  style={{borderColor:"red"}} placeholder="Enter Email" name="email"  value={this.state.email}  onChange={this.onChange} required={true} />
                        </div>
                        <div className="form-group" style={{borderColor:"red"}}>
                            <input type="password" className="form-control"  style={{borderColor:"red"}} placeholder="Enter Password" name="password"  value={this.state.password}  onChange={this.onChange} required={true} />
                        </div>
                        <div className="row">
                            <button type="submit"  style={{backgroundColor:"#DC3545", border:"none", marginLeft:"20px"}}>submit</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default Login