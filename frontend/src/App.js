import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import PostersListContainer from './containers/posters-list';

const App = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={PostersListContainer} />
        </Router>
    </Provider>
);

export default App;
