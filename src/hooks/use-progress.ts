import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useProgress(userId: string | undefined) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!userId) {
      setCompleted(new Set());
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("module_progress").select("day").eq("user_id", userId);
    setCompleted(new Set((data ?? []).map((r) => r.day)));
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const toggle = async (day: number) => {
    if (!userId) return;
    if (completed.has(day)) {
      await supabase.from("module_progress").delete().eq("user_id", userId).eq("day", day);
    } else {
      await supabase.from("module_progress").insert({ user_id: userId, day });
    }
    await refresh();
  };

  return { completed, loading, toggle };
}
