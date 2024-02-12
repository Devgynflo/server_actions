import { JobFilterSidebar } from "@/components/JobFilterSidebar";
import { JobResults } from "@/components/JobResults";
import { H1 } from "@/components/ui/h1";
import { JobFilterValue } from "../../schemas/validation";

interface HomePageProps {
  searchParams: {
    q?: string;
    location?: string;
    type?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { q, location, type, remote },
}: HomePageProps) {

  const filterValues: JobFilterValue = {
    q,
    type,
    remote: remote === "true",
    location,
  }

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>Developer Jobs</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>

      <section className="flex flex-col gap-4  md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues}/>
      </section>
    </main>
  );
}
