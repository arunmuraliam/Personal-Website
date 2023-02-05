import React, { Component } from 'react'
import '../../login.css'
//import ValidateableForm from 'react-form-validate';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classname: "div-center",
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        console.log(email, password);

        fetch("http://localhost:8080/adminlogin", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "Admin Login");
                if (data.status == "ok") {
                    alert("Login successful");
                    window.localStorage.setItem("token", data.data);
                    window.localStorage.setItem("loggedIn",true)

                    window.location.href = './admin';
                } else {
                    alert(data.error);
                    this.setState({ classname: "background-red" })

                }
            })

    }

    render() {
        return (


            <div>
                <div className="back">


                    <div className={this.state.classname} >


                        <div className="content">


                            <h3>Login</h3>
                            <hr />
                            <form method='post' onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" name='email' onChange={(e) => this.setState({ email: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" name='password' onChange={(e) => this.setState({ password: e.target.value })} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                                <hr />
                                <button type="button" className="btn btn-link">Signup</button>
                                <button type="button" className="btn btn-link">Reset Password</button>

                            </form>

                        </div>



                    </div>

                </div>
            </div>
        )
    }
}

export default Login