import React from 'react';
import Banner from './Banner/Banner';
import Features from './Features/Features';
import HowItWorks from './HowItWork/HowItWorks';
import IssueCategoriesAndPriorities from './IssueCategoriesAndPriorities/IssueCategoriesAndPriorities';
import CommunityImpact from './CommunityImpact/CommunityImpact';
import LatestResolvedIssues from './LatestResolvedIssues/LatestResolvedIssues';
import FAQ from './FAQ/FAQ';
import Testimonials from './Testimonials/Testimonials';
import Pricing from './Pricing/Pricing';

const Home = () => {
    return (
        <div>
            <title>Civic Alert - Home</title>
            <header>
                <Banner />
            </header>
            <main>
                <Features />
                <LatestResolvedIssues />
                <HowItWorks />
                <CommunityImpact />
                <IssueCategoriesAndPriorities />
                <Testimonials/>
                <Pricing/>
                <FAQ/>
            </main>
        </div>
    );
};

export default Home;