import React, { Component } from 'react'
import '../../login.css'

export class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const {email, password} = this.state;
        console.log(email, password);

        fetch("http://localhost:8080/adminsignup", {
            method : "POST",
            crossDomain:true,
            headers: {
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            body :JSON.stringify(this.state),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data,"Admin Register");
        })

    }
    render() {
        return (
            <div>
                <div className="back">


                    <div className="div-center">


                        <div className="content">


                            <h3>Signup</h3>
                            <hr />
                            <form method='post' onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" name='email' onChange={(e) => this.setState({email : e.target.value})} className="form-control" id="exampleInputEmail1" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" name='password' onChange={(e) => this.setState({password : e.target.value})} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-primary">Signup</button>
                                <hr />
                                <button type="button" className="btn btn-link">Signin</button>


                            </form>

                        </div>



                    </div>

                </div>
            </div>
        )
    }
}

export default Signup