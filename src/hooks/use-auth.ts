import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { mockAuth } from "@/integrations/mock-auth";

const MOCK_AUTH_ENABLED = import.meta.env.VITE_MOCK_AUTH === "true" && import.meta.env.DEV;

export type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
};

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (MOCK_AUTH_ENABLED) {
      // Use mock auth for testing
      // Check session every time effect runs
      const mockSession = mockAuth.getSession();
      if (mockSession) {
        // Convert mock session to Supabase format for compatibility
        const mockSupabaseSession: Session = {
          user: {
            id: mockSession.user.id,
            aud: "authenticated",
            role: "authenticated",
            email: mockSession.user.email,
            email_confirmed_at: new Date().toISOString(),
            phone: "",
            confirmed_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString(),
            app_metadata: {},
            user_metadata: {
              full_name: mockSession.user.full_name,
            },
            identities: [],
            created_at: mockSession.user.created_at,
            updated_at: mockSession.user.created_at,
            is_anonymous: false,
          } as any,
          access_token: mockSession.token,
          token_type: "bearer",
          expires_in: 3600,
          refresh_token: "",
          expires_at: Date.now() + 3600000,
        };
        setSession(mockSupabaseSession);
        setIsAdmin(false); // Mock users are not admins
      } else {
        setSession(null);
      }
      setLoading(false);
      return;
    }

    // Real Supabase auth flow
    // 1) set up listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s?.user) {
        // fire-and-forget — touch last_login + role check
        supabase.rpc("touch_last_login").then(() => {});
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", s.user.id)
          .then(({ data }) => {
            setIsAdmin(!!data?.some((r) => r.role === "admin"));
          });
      } else {
        setIsAdmin(false);
      }
    });

    // 2) then hydrate existing session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, user: session?.user ?? null, loading, isAdmin };
}
