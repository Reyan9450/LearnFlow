import { createServerClient } from "./server";
import type { Course } from "@/types";

export async function getCourses(): Promise<Course[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, progress, icon_name, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return (data as Course[]) ?? [];
}
