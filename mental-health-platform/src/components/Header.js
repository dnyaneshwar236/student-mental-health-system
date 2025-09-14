import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Mental Health Platform</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/articles">Articles</a></li>
                    <li><a href="/games">Games</a></li>
                    <li><a href="/meditation">Meditation</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;