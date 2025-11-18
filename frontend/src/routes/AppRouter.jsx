import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import AuthRoute from "../components/miniCompo/AuthRoute";

const wrapRoute = (route) => {
  const wrapped = {
    path: route.path,
    element: route.public
      ? route.element
      : <AuthRoute requiredRoles={route.roles}>{route.element}</AuthRoute>,
  };

  if (route.index) wrapped.index = true;
  if (route.children) wrapped.children = route.children.map(wrapRoute);

  return wrapped;
};

export const router = createBrowserRouter(routes.map(wrapRoute));
