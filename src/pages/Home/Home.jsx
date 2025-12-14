import React from 'react';
import Banner from './Banner/Banner';
import Features from './Features/Features';
import HowItWorks from './HowItWork/HowItWorks';
import IssueCategoriesAndPriorities from './IssueCategoriesAndPriorities/IssueCategoriesAndPriorities';
import CommunityImpact from './CommunityImpact/CommunityImpact';

const Home = () => {
    return (
        <div>
            <header>
           <Banner/>
            </header>
            <main>
                <Features/>
                <HowItWorks/>
                <CommunityImpact/>
                <IssueCategoriesAndPriorities/>
            </main>
        </div>
    );
};

export default Home;