
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Schedule = Tables<"schedules">;

export const useSchedules = () => {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schedules")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching schedules:", error);
        throw error;
      }

      return data || [];
    },
  });
};
