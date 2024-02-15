import { JobDetailsPage } from "@/components/JobDetailsPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminSidebar } from "./_components/AdminSidebar";

interface AdminJobsPageProps {
  params: {
    slug: string;
  };
}

export function metadata(): Metadata {
  return {
    title: "Jobs to approve",
  };
}

export default async function AdminJobsPage({
  params: { slug },
}: AdminJobsPageProps) {
  const job = await prisma?.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return (
    <main className="flex m-auto my-10 max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
        <JobDetailsPage job={job}/>
        <AdminSidebar job={job}/>
    </main>
  );
}
