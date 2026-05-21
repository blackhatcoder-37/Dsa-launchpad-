import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { mockAuth } from "@/integrations/mock-auth";

const MOCK_AUTH_ENABLED = import.meta.env.VITE_MOCK_AUTH === "true" && import.meta.env.DEV;

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    if (typeof window === "undefined") return; // skip on SSR
    
    let session = null;
    
    if (MOCK_AUTH_ENABLED) {
      // Check mock auth first
      session = mockAuth.getSession();
    } else {
      // Check real Supabase auth
      const { data } = await supabase.auth.getSession();
      session = data.session;
    }
    
    if (!session) {
      throw redirect({ to: "/login", search: { redirect: location.href } as any });
    }
  },
  component: () => <Outlet />,
});
