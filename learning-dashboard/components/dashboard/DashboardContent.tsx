import { getCourses } from "@/lib/supabase/queries";
import { BentoGrid } from "./BentoGrid";
import { ErrorState } from "./ErrorState";

export async function DashboardContent() {
  let courses;
  let errorMessage: string | undefined;

  try {
    courses = await getCourses();
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
    courses = null;
  }

  if (errorMessage || !courses) {
    return <ErrorState message={errorMessage} />;
  }

  return <BentoGrid courses={courses} />;
}
