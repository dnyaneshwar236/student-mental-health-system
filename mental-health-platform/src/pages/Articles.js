import React from 'react';
import ArticleList from '../features/articles/ArticleList';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Articles = () => {
    return (
        <div>
            <Header />
            <h1>Articles on Mental Health</h1>
            <ArticleList />
            <Footer />
        </div>
    );
};

export default Articles;