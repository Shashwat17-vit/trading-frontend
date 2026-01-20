import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signin />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
