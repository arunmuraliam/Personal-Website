import React, { Component } from 'react'

import Adminnav from './Adminnav'


export class Admin extends Component {
    componentDidMount() {
        fetch("http://localhost:8080/admin", {
            method : "POST",
            crossDomain:true,
            headers: {
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            body :JSON.stringify({
                token : window.localStorage.getItem("token")
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data,"Admin Register");
        })
    }
    
    render() {
        return (
            <div>
                <Adminnav />
                <br />
                <h1>Hello  Admin...</h1>
                <br />
                
            </div>
        )
    }
}

export default Admin
