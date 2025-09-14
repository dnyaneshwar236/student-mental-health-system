import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Games from './pages/Games';
import Meditation from './pages/Meditation';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/articles" component={Articles} />
                    <Route path="/games" component={Games} />
                    <Route path="/meditation" component={Meditation} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;