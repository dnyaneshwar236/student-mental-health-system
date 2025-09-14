import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Header />
            <h1>Welcome to the Mental Health Platform</h1>
            <p>Your journey to better mental health starts here.</p>
            <h2>Explore Our Features</h2>
            <ul>
                <li><Link to="/articles">Read Articles</Link></li>
                <li><Link to="/meditation">Meditation Sessions</Link></li>
                <li><Link to="/games">Stress Relief Games</Link></li>
            </ul>
            <Footer />
        </div>
    );
};

export default Home;