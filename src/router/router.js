import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import PhotoAlbumView from "../views/PhotoAlbumView";
import ErrorView from "../views/ErrorView";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorView />
  },
  {
    path: "/album",
    element: <PhotoAlbumView />
  }
]);

export default router;