import React from 'react';
import About from '../About/About';
import Banner from '../Banner/Banner';
import ContactDetails from '../ContactDetails/ContactDetails';
import Products from '../Products/Products';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <Banner/>
            <About/>
            <Services />
            <ContactDetails/>
            <Products/>
        </div>
    );
};

export default Home;