import { JobListItem } from "@/components/JobListItem";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { JobFilterValue } from "../../schemas/validation";

interface JobResultsProps {
  filterValues: JobFilterValue;
}

export const JobResults = async ({
  filterValues: { q, location, type, remote },
}: JobResultsProps) => {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          {
            title: {
              search: searchString,
            },
          },
          {
            companyName: {
              search: searchString,
            },
          },
          {
            type: {
              search: searchString,
            },
          },
          {
            location: {
              search: searchString,
            },
          },
          {
            locationType: {
              search: searchString,
            },
          },
        ],
      }
    : {};
  
    const where: Prisma.JobWhereInput = {
      AND: [
        searchFilter,
        type ? { type } : {},
        location ? { location } : {},
        remote ? { locationType: "Remote" } : {},
        { approved: true }
      ]
    }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
      {jobs.length === 0 && (<p className="text-center m-auto">No jobs found.Try adjusting your search filters.</p>)}
    </div>
  );
};
