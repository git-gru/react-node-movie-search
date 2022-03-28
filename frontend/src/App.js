import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import PostersList from "./features/posters/PostersList";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PostersList />} />
    </Routes>
  </Router>
);

export default App;
