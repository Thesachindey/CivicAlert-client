import React from 'react';
import { HashLoader } from 'react-spinners';

const LoadingPage = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
             <title>CivicAlert</title>
           <HashLoader color='green' />
        </div>
    );
};

export default LoadingPage;