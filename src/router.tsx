import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree as generatedRouteTree } from "./routeTree.gen";
import { Route as ShopRoute } from "./routes/shop";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree: generatedRouteTree._addFileChildren({ ShopRoute }),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
