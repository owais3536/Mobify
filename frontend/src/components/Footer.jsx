import React from 'react';

const Footer = () => {
    return (
        <div className='footer bg-dark-subtle'>
            <div className='py-3 fs-5'>&copy;{new Date().getFullYear()} All Rights Reservered</div>
        </div>
    );
};

export default Footer;