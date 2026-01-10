import React from 'react';
import { MdOutlineCrisisAlert } from "react-icons/md"
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link to={'/'}>
            <div className="logo-font flex items-end">
            <MdOutlineCrisisAlert className='text-primary font-bold' size={45} />
            <h2 className='text-3xl font-extrabold -ms-9'>CivicAlert</h2>
            </div>
            
        </Link>
    );
};

export default Logo;