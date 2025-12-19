import React from 'react';
import Banner from './Banner/Banner';
import Features from './Features/Features';
import HowItWorks from './HowItWork/HowItWorks';
import IssueCategoriesAndPriorities from './IssueCategoriesAndPriorities/IssueCategoriesAndPriorities';
import CommunityImpact from './CommunityImpact/CommunityImpact';
import LatestResolvedIssues from './LatestResolvedIssues/LatestResolvedIssues';

const Home = () => {
    return (
        <div>
            <title>Home</title>
            <header>
                <Banner />
            </header>
            <main>
                <Features />
                <LatestResolvedIssues />
                <HowItWorks />
                <CommunityImpact />
                <IssueCategoriesAndPriorities />
            </main>
        </div>
    );
};

export default Home;