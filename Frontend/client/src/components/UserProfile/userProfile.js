import React, { PureComponent } from 'react'
import axios from 'axios'
import decode from 'jwt-decode';

class UserProfile extends PureComponent {
    constructor(props) {
        super(props)


        this.onChange = this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            name:'',
            email:'',
            number:'',
            address:'',
            id:'',


            email1:''
        }
    }






    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }



    componentDidMount = () =>{
        if(sessionStorage.token){
            this.setState({email1:decode(sessionStorage.token).email})


        // const users={
        //     email:this.state.email1,
        // }

            const id =decode(sessionStorage.token).email;

        axios.get(`http://localhost:5000/user/getUserById/${id}`).then(res =>{
            this.setState({
                name:res.data.name,
                email:res.data.email,
                number:res.data.number,
                address:res.data.address,
                id:res.data._id
            })
        } )
        }
    }//componentDidMount





    onSubmit(e){
        e.preventDefault();
        try {
            const users={
                name:this.state.name,
                id:this.state.id,
                number:this.state.number,
                address:this.state.address,
            }
            console.log( this.props.match.params.id);
            axios.put(`http://localhost:5000/user/editUser/${users.id}`,users).then(res => alert(res.data.msg))
            this.props.history.push('/userProfile')
        } catch (error) {
            alert(error.response.data.msg)
        }
    }//onSubmit
    render() {
        return (
            <div>

                <br/>
                <br/>
                <div className="login-page"style={{  height: 700}}>
                    <h1>User Profile</h1>



                    <form  onSubmit={this.onSubmit}   >
                        <div className="form-group">
                            <input  type="text" className="form-control" name="email" value={this.state.email}    />
                        </div>
                        <div className="form-group">
                            <input   type="text"className="form-control"  name="name"   value={this.state.name}   onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <input type="number" className="form-control"  name="number"   value={this.state.number}   onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control"  name="address"   value={this.state.address}   onChange={this.onChange} />
                        </div>
                        <div className="row" style={{ border:"none", marginTop:"50px"}}>
                            <button type="submit" style={{ border:"none", marginLeft:"460px"}}>Update</button>

                        </div>
                    </form>



                </div>

            </div>
        )
    }
}

export default UserProfile