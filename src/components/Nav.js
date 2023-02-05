import React, { Component } from 'react'

export class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      detailsLoaded: false
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
    const {detailsLoaded,items} = this.state;
    return (
      <div>
        {
          items.map((item) => (
            <div className="topnav" id="myTopnav">
              <a href='/' className="active" style={{ fontFamily: "cursive" }}>{item.fname} {item.lname}</a>
              <div className="menus" style={{ float: "right", paddingRight: "2.5%", textDecoration: "none" }}>
                <a href='/'>Home</a>
                <a href='/'>About</a>
                <a href='/'>Services</a>
                <a href='/'>Contact</a>
              </div>
              <a href='/' className="icon"   >
                <i className="fa fa-bars"></i>
              </a>
            </div>
          ))
        }

      </div>
    )
  }
}

export default Nav