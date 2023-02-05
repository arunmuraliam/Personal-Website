import React, { Component } from 'react'
//import arun from '../images/arun.jpg'

export class About extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    detailsLoaded: true
                })
            })
    }
    render() {
        const { detailsLoaded, items } = this.state;
        //var item = items[0]
        //console.log(item);
        return (
            <div>
                {
                    items.map((item) => {

                        console.log(item.image.data.data);

                        // Converting binary to image from mongodb

                        var bindata = item.image.data.data;
                        let uint8 = new Uint8Array(bindata);
                        let file = new File([uint8], { type: "image/png" });
                        const url = URL.createObjectURL(file);

                        return (
                            <section className="section about-section gray-bg" id="about">
                                <div className="container">
                                    <div className="row align-items-center flex-row-reverse">
                                        <div className="col-lg-6">
                                            <div className="about-text go-to">
                                                <h3 className="dark-color">About Me</h3>
                                                <h6 className="theme-color lead" style={{ color: "black" }}>{item.role}</h6>
                                                <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p>
                                                <p>My skills : {item.skills[0]}, {item.skills[1]}, {item.skills[2]}. I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="about-avatar">
                                                <img src={url} title="" alt="Myphoto" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        )

                    })
                }

            </div>
        )
    }
}

export default About