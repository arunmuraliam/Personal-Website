import React, { Component } from 'react'
import axios from "axios";
//import validateName from '../jsvalidation'
import $ from 'jquery';

export class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: ""
        }
    }

    onFileChange = (e) => {
        this.setState({ image: e.target.files[0] })
        console.log(e.target.files[0]);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted");

        const formData = new FormData();

        const firstname = e.target.firstName.value;
        const lastname = e.target.lastName.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const message = e.target.message.value;
        //const image = e.target.files;

        if(firstname == ''){
            document.getElementById('fname-error').innerHTML="Please enter first name";
            return false;
        }


        formData.append("image", this.state.image);

        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("message", message);

        console.log(formData);
        // var data = {
        //     firstname : firstname,
        //     lastname : lastname,
        //     email : email,
        //     phone : phone,
        //     message : message,
        //     file : formData
        // }
        //console.log(data);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post("http://localhost:8080/", formData, config)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log("error in request", err);
            });

        // fetch("http://localhost:8080/", {
        //     method :"POST",
        //     //mode :"cors",
        //     //body :JSON.stringify(data), 
        //     headers : { 
        //         'Accept': 'application/json',
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     body : data
        // }).then((response) => {

        //     console.log(response);
        //     return response.json();
        // })
    }

    componentDidMount(){
        $(document).ready(function() {
            // $('#firstName').change(function(e){
            //     e.preventDefault();
            //     var firstname=$('#firstName').val();
            //     if (firstname.length < 3) {
            //         $('#firstName').after('<span class="error">characters less than 3</span>');
            //       }
            // })

            $('#contact-form').submit(function(e) {
              e.preventDefault();
              var first_name = $('#firstName').val();
              var last_name = $('#lastName').val();
              var email = $('#email').val();
              
          
              $(".error").remove();
          
              if (first_name.length < 1) {
                $('#firstName').after('<span class="error">This field is required</span>');
              }
              if (last_name.length < 1) {
                $('#lastName').after('<span class="error">This field is required</span>');
              }
              if (email.length < 1) {
                $('#email').after('<span class="error">This field is required</span>');
              } else {
                var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
                var validEmail = regEx.test(email);
                if (!validEmail) {
                  $('#email').after('<span class="error">Enter a valid email</span>');
                }
              }
              
            });
          
          });
    }

    
    render() {
        return (
            <div>

                <section style={{ padding: "30px", paddingBottom: "50px" }} id="contact">
                    <div className="container" style={{ width: "100%" }}>
                        <div className="contact__wrapper shadow-lg mt-n9">
                            <div className="row no-gutters">
                                <div style={{ backgroundColor: "rgb(178, 189, 82)" }} className="col-lg-5 contact-info__wrapper gradient-brand-color p-5 order-lg-2">
                                    <h3 className="color--white mb-5">Get in Touch</h3>

                                    <ul className="contact-info__list list-style--none position-relative ">
                                        <li className="mb-4 pl-4">
                                            <span className="position-absolute"><i className="fas fa-envelope"></i></span> arunmuraleedharan186@gmail.com
                                        </li>
                                        <li className="mb-4 pl-4">
                                            <span className="position-absolute"><i className="fas fa-phone"></i></span> +91 9495831159
                                        </li>

                                    </ul>


                                </div>

                                <div className="col-lg-7 contact-form__wrapper p-5 order-lg-1">
                                    <form action="/" id="contact-form" encType="multipart/form-data" onSubmit={this.handleSubmit} className="contact-form form-validate" novalidate="novalidate" method="post">
                                        <div className="row">
                                            <div className="col-sm-6 mb-3">
                                                <div className="form-group">
                                                    <label className="required-field" for="firstName">First Name</label>
                                                    <input type="text"  className="form-control" id="firstName" name="firstName" placeholder="Arun" />
                                                    <label id='fname-error' name='fname-error'> </label>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 mb-3">
                                                <div className="form-group">
                                                    <label for="lastName">Last Name</label>
                                                    <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Muraleedharan" />
                                                    <label id='lname-error' name='lname-error'> </label>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 mb-3">
                                                <div className="form-group">
                                                    <label className="required-field" for="email">Email</label>
                                                    <input type="text" className="form-control" id="email" name="email" placeholder="arunm@gmail.com" />
                                                    <label id='email-error' name='email-error'> </label>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 mb-3">
                                                <div className="form-group">
                                                    <label for="phone">Phone Number</label>
                                                    <input type="number" className="form-control" id="phone" name="phone" placeholder="+91 7889567867" />
                                                    <label id='phone-error' name='phone-error'> </label>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 mb-3">
                                                <div className="form-group">
                                                    <label className="required-field" for="message">Message</label>
                                                    <textarea name="message" className="form-control" id="message" rows="4" placeholder="Hi there, I would like to....."></textarea>
                                                    <label id='message-error' name='message-error'> </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-3">
                                                <div className="form-group">
                                                    <label className="required-field" for="image">Image </label>
                                                    <input type="file" onChange={this.onFileChange} className="image" id="image" name="image" />
                                                    <label id='image-error' name='image-error'> </label>
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

export default Contact