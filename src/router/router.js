import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import App from '../App';
import PhotoAlbumView from '../views/PhotoAlbumView';
import ErrorView from '../views/ErrorView';

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/album" element={<PhotoAlbumView />} />
      <Route path="*" element={<ErrorView />} />
    </Routes>
  </Router>
);

export default router;
