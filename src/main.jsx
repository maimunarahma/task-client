import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Provider/AuthProvider.jsx';
import Login from './Authentication/Login.jsx';
import Register from './Authentication/Register.jsx';
import AddTask from './Routes/AddTask.jsx';
import MyTask from './Routes/MyTask.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
children:[
  {
    
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/register',
      element:<Register/>
    
  },
  {
    path:'/add',
    element:<AddTask/>
  },{
    path:'/mytask/:email',
    element:<MyTask/>,
    loader: ({ params }) => {
      console.log(params.email); // Debugging: Check if params.email is being passed correctly
      return fetch(`http://localhost:5000/task/${params.email}`).then(response => response.json());
  }
  }
]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>,
)
