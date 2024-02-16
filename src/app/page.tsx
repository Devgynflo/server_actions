import { JobFilterSidebar } from "@/components/JobFilterSidebar";
import { JobResults } from "@/components/JobResults";
import { H1 } from "@/components/ui/h1";
import { Metadata } from "next";
import { JobFilterValue } from "../../schemas/validation";

function strUcFirst(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function getTitle({ q, location, remote, type }: JobFilterValue) {
  const titlePrefix = q
    ? `${strUcFirst(q)} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? "Remote developer jobs"
        : "All Developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, location, type, remote },
}: HomePageProps): Metadata {
  return {
    title: `${getTitle({ q, type, remote: remote === "true", location })} | Flow Jobs`,
  };
}

interface HomePageProps {
  searchParams: {
    q?: string;
    location?: string;
    type?: string;
    remote?: string;
    page:string
  };
}

export default async function Home({
  searchParams: { q, location, type, remote,page },
}: HomePageProps) {
  const filterValues: JobFilterValue = {
    q,
    type,
    remote: remote === "true",
    location,
    
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>

      <section className="flex flex-col gap-4  md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} page={page ? parseInt(page) : undefined} />
      </section>
    </main>
  );
}
