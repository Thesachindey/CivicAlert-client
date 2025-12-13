import React from 'react';
import Banner from './Banner/Banner';
import Features from './Features/Features';
import HowItWorks from './HowItWork/HowItWorks';

const Home = () => {
    return (
        <div>
            <header>
           <Banner/>
            </header>
            <main>
                <Features/>
                <HowItWorks/>
            </main>
        </div>
    );
};

export default Home;