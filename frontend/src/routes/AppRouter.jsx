import { createBrowserRouter } from "react-router-dom";
import {routes} from './routes';


const AppRouter = () => {
    return createBrowserRouter(

        routes.map((route) => ({
            path : route.path,
            element : route.element
        }))
    )
}

export default AppRouter;