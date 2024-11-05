import {
  createBrowserRouter,
} from "react-router-dom";
import { snowflakeClient } from "@snowflake/native-apps";
import { HomePage } from "../pages/HomePage";

export const routes = [
  {
    path: "/",
    element: <HomePage/>,
  },
];

export const router = createBrowserRouter(routes);

router.subscribe((state) => {
  snowflakeClient.setPath(state.location.pathname);
});

snowflakeClient.setHandler('setPath', (path) => {
  router.navigate(path, { replace: true });
  return Promise.resolve();
});
