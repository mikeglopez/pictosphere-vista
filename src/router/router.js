import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Standby from "../views/Standby";
import PhotoAlbum from "../views/PhotoAlbum";
import ErrorView from "../views/ErrorView";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "/",
        element: <Standby />
      },
      {
        path: "/album",
        element: <PhotoAlbum />
      }
    ]
  }
]);

export default router;