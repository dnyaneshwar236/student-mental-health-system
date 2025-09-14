import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Mental Health Platform. All rights reserved.</p>
            <p>Contact us: support@mentalhealthplatform.com</p>
        </footer>
    );
};

export default Footer;