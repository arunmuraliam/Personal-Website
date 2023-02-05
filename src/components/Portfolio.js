import React from 'react'

import '../App.css';

import Nav from './Nav';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import Footer from './Footer';

function Portfolio() {
    return (
        <div className='Portfolio'>
            <Nav />
            <About />
            <Services />
            <Contact />
            <Footer />
        </div>
    )
}

export default Portfolio