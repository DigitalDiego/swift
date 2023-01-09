import { createClient } from "@supabase/supabase-js";

export const saveToStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem(key, value);
  }
};

export const getFromStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
};

export const removefromStorage = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.clear();
  }
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || ""
);
