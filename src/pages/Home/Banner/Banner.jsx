import React from 'react';
import { Link } from 'react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Banner = () => {
    return (
        <div className="py-5">
        <section className="bg-base-200 shadow py-20 px-6 lg:px-20 rounded-3xl">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10">

                {/* Left Side: Text + CTA */}
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-5xl font-extrabold text-secondary mb-4">Make Your City <br /><span className='text-primary'>Better</span>.</h1>
                    <p className="text-xl mb-6">
                        Report public infrastructure issues and help improve your city. Track your reports, see progress in real-time, and make your city a better place to live.
                    </p>
                    <p className="mb-6 text-sm italic">Your Voice, Your City</p>
                    <Link
                        to="dashboard/report-issue"
                        className="btn btn-primary text-secondary btn-lg shadow-lg hover:scale-105 transition-transform"
                    >
                        Report an Issue
                    </Link>
                </div>

                <div className="flex-1">
                    
                    <DotLottieReact

                        src="https://lottie.host/4a1f9ad7-7587-4fa0-b4ed-746075a70a2f/9gLoh3gzhs.lottie"
                        loop
                        autoplay
                    />
                </div>
            </div>
        </section>
        </div>
    );
};

export default Banner;
