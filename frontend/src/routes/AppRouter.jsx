// AppRouter.jsx
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import AuthRoute from "../componenets/miniCompo/AuthRoute";

const AppRouter = () => {
  return createBrowserRouter(
    routes.map((route) => ({
      path: route.path,
      element: route.public ? (
        route.element
      ) : (
        <AuthRoute requiredRoles={route.roles}>
          {route.element}
        </AuthRoute>
      ),
    }))
  );
};

export default AppRouter;
