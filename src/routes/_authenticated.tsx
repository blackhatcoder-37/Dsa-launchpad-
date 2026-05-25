import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    // Only validate auth on client side, not during SSR
    if (typeof window !== "undefined") {
      const userInfoStr = localStorage.getItem("dsa_launchpad_user_info");
      if (!userInfoStr) {
        throw redirect({
          to: "/login",
          search: { 
            redirect: location.pathname + location.search + location.hash,
          } as Record<string, string>,
        });
      }
    }
  },
  component: () => <Outlet />,
});
