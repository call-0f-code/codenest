// AppRouter.jsx
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import AuthRoute from "../componenets/miniCompo/AuthRoute";

const wrapRoute = (route) => {
  const wrapped = {
    path: route.path,
    element: route.public ? (
      route.element
    ) : (
      <AuthRoute requiredRoles={route.roles}>{route.element}</AuthRoute>
    ),
  };

  if(route.index){
    wrapped.index = true;
  }

  if (route.children) {
    wrapped.children = route.children.map(wrapRoute);
  }

  return wrapped;
};

const AppRouter = () => {
  console.log("inside AppRouter")
  return createBrowserRouter(routes.map(wrapRoute));
};

export default AppRouter;
