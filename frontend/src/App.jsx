import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";



function App() {
  return <>

    <RouterProvider router={AppRouter()}/>
    <Toaster position="top-center" reverseOrder={false} />
  </>;
}

export default App;
