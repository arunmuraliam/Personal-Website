import React, { Component } from 'react'
import Adminnav from './Adminnav';
import axios from "axios";

export class UpdateImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: ""
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/updateimage")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json
                })
            })
    }

    onFileChange = (e) => {
        this.setState({ image: e.target.files[0] })
        console.log(e.target.files[0]);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted");

        const formData = new FormData();

        formData.append("image", this.state.image);

        console.log(formData);
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post("http://localhost:8080/updateimage", formData, config)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log("error in request", err);
            });

        
    }

    render() {
        return (
            <div>
                <Adminnav />
                <section style={{ padding: "30px", paddingBottom: "50px" }} id="contact">
                    <div className="container" style={{ width: "100%" }}>
                        <div className="contact__wrapper shadow-lg mt-n9">
                            <div className="row no-gutters">
                                

                                <div className="col-lg-7 contact-form__wrapper p-5 order-lg-1">
                                    <form action="/" id="contact-form" encType="multipart/form-data" onSubmit={this.handleSubmit} className="contact-form form-validate" novalidate="novalidate" method="post">
                                        <div className="row">
                                            
                                            <div className="col-sm-12 mb-3">
                                                <div className="form-group">
                                                    <label className="required-field" for="image">Image</label> &nbsp;&nbsp;&nbsp;
                                                    <input type="file" onChange={this.onFileChange} className="image" id="image" name="image" />
                                                </div>
                                            </div>

                                            <div className="col-sm-12 mb-3 button1">
                                                <button type="submit" className="btn btn-primary " style={{ backgroundColor: "rgb(162, 174, 61)", border: "none" }}>Submit</button>
                                            </div>

                                        </div>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default UpdateImage