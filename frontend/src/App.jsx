import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import ClientChatbotWrapper from "./components/ClientChatbotWrapper"; 

function App() {
  return (
    <>
      <RouterProvider router={AppRouter()} />
      <ClientChatbotWrapper /> 
    </>
  );
}

export default App;
