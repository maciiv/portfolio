import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Scheduler from './components/scheduler/Scheduler';
import TriviaHome from './components/trivia/TriviaHome';
import TriviaQuestions from './components/trivia/TriviaQuestions';
import TriviaWinners from './components/trivia/TriviaWinners';

import './assets/css/custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/webapps/scheduler' component={Scheduler} />
        <Route exact path='/webapps/trivia' component={TriviaHome} />
        <Route exact path='/webapps/trivia/questions/:category?' component={TriviaQuestions} />
        <Route exact path='/webapps/trivia/finish' component={TriviaWinners} />
    </Layout>
);
