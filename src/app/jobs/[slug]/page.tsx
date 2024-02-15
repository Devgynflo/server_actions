import { JobDetailsPage } from "@/components/JobDetailsPage";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface Pageprops {
  params: {
    slug: string;
  };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return job;
});

export async function generateMetadata({
  params: { slug },
}: Pageprops): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export async function generateStaticParams() {
    const jobs = await prisma.job.findMany({
        where: {approved: true},
        select: {slug: true}
    });
    return jobs.map(({slug}) => slug);    
}

export default async function Page({ params: { slug } }: Pageprops) {
  const job = await getJob(slug);
  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.log("No application link found for job", job.title);
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3  md:flex-row md:items-start">
      <JobDetailsPage job={job} />
      <aside>
        <Button asChild>
            <a href={applicationLink} className="w-40 md:w-fit">Apply now</a>
        </Button>
      </aside>
    </main>
  );
}
