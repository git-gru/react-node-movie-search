import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import PostersListContainer from "./containers/posters-list";

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={PostersListContainer} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
