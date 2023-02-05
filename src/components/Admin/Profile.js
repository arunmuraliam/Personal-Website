import React, { Component } from 'react'
import Adminnav from './Adminnav'

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            selectedHobbies: []

        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/profile")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json
                })
            })
    }

    handleSelection = e => {
        // get checkboxes of a group
        let ele = document.getElementsByName('hobbies[]');
        let values = [];
        // extract selected values
        for (let i = 0; i < ele.length; i++) {
            (ele[i].checked && values.push(ele[i].value))
        }
        // store in state or use them
        this.setState({ selectedHobbies: values });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted");
        const fname = e.target.fname.value;
        const lname = e.target.lname.value;
        const role = e.target.role.value;
        const skills = e.target.skills.value;

        var data = {
            fname: fname,
            lname: lname,
            role: role,
            skills: skills,
            hobbies: this.state.selectedHobbies

        }
        console.log(data);

        // axios.post("http://localhost:8080/", data)
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(err => {
        //     console.log("error in request", err);
        //   });

        fetch("http://localhost:8080/profile", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {

            console.log(response);
            return response.json();
        })
    }

    render() {
        const { items } = this.state;
        console.log(items);
        return (
            <div>
                <Adminnav />
                {
                    items.map((item) => (

                        <div className="container">
                            <div className=" text-center mt-5 ">

                                <h1 >My Details</h1>


                            </div>


                            <div className="row ">
                                <div className="col-lg-7 mx-auto">
                                    <div className="card mt-2 mx-auto p-4 bg-light">
                                        <div className="card-body bg-light">

                                            <div className="container">
                                                <form action='' method='post' onSubmit={this.handleSubmit} id="contact-form" >



                                                    <div className="controls">

                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label for="form_name">Firstname *</label>
                                                                    <input id="form_name"  defaultValue={item.fname} type="text" name="fname" className="form-control" required="required" />
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label for="form_lastname">Lastname *</label>
                                                                    <input id="form_lastname" defaultValue={item.lname} type="text" name="lname" className="form-control" required="required" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label for="form_email">Role *</label>
                                                                    <input id="form_role" type="text" name="role" defaultValue={item.role} className="form-control" required="required" />

                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label for="form_email">Add new skill</label>
                                                                    <input id="form_role" type="text" name="skills" placeholder={item.skills} defaultValue={item.skills} className="form-control" required="required" />

                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label for="form_email">Hobbies</label><br />
                                                                    <input type="checkbox" onClick={this.handleSelection} id="hobbies[]" name="hobbies[]" value="football" /> &nbsp;
                                                                    <label for="vehicle1"> Football</label> &nbsp;&nbsp;
                                                                    <input type="checkbox" onClick={this.handleSelection} id="hobbies[]" name="hobbies[]" value="drawing" /> &nbsp;
                                                                    <label for="vehicle2"> Drawing</label><br />
                                                                    <input type="checkbox" onClick={this.handleSelection} id="hobbies[]" name="hobbies[]" value="cricket" /> &nbsp;
                                                                    <label for="vehicle2"> Cricket</label> &nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <input type="checkbox" onClick={this.handleSelection} id="hobbies[]" name="hobbies[]" value="writing" /> &nbsp;
                                                                    <label for="vehicle3"> Writing</label><br /><br />

                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row">



                                                            <div className="col-md-12">

                                                                <input type="submit" className="btn btn-success btn-send  pt-2 btn-block" value="Update" />

                                                            </div>

                                                        </div>


                                                    </div>
                                                </form>
                                            </div>
                                        </div>


                                    </div>


                                </div>


                            </div>
                        </div>
                    ))

                }

            </div>
        )
    }
}


export default Profile



