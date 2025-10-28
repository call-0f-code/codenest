import "./App.css";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "./components/common/ThemeToggle";

function App() {
  return <>

    <RouterProvider router={AppRouter()}/>
    <Toaster position="top-center" reverseOrder={false} />
    <ThemeToggle />
  </>;
}

export default App;
