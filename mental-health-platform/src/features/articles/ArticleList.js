import React, { useEffect, useState } from 'react';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('https://api.example.com/articles'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Articles on Mental Health</h2>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;