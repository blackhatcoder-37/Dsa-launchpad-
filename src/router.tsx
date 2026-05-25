import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

let queryClient: QueryClient | null = null;

export const getRouter = () => {
  // Create QueryClient once and reuse it to avoid hydration mismatches
  if (!queryClient) {
    queryClient = new QueryClient();
  }

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
