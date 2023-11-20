import { HashRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import PhotoAlbumView from "../views/PhotoAlbumView";
import ErrorView from "../views/ErrorView";

const router = (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} caseSensitive />
      <Route path="/album" element={<PhotoAlbumView />} caseSensitive />
      <Route path="*" element={<ErrorView />} caseSensitive />
    </Routes>
  </HashRouter>
);

export default router;