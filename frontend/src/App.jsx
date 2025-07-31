import "./App.css";
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";




function App() {
  return (
    <>
      <RouterProvider router={AppRouter()}/>
      <Toaster />
    </>
  );
}

export default App;
