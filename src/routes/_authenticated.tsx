import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    // Check if user info exists in localStorage
    if (typeof window === "undefined") return;
    
    const userInfoStr = localStorage.getItem("dsa_launchpad_user_info");
    if (!userInfoStr) {
      throw redirect({ to: "/login", search: { redirect: location.href } as any });
    }
  },
  component: () => <Outlet />,
});
