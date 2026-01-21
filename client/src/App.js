import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signin />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
