import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MarkdownPage } from "./Markdown";

interface JobDetailsPageProps {
  job: Job;
}

export const JobDetailsPage = ({
  job: {
    title,
    applicationUrl,
    companyLogoUrl,
    companyName,
    description,
    location,
    locationType,
    salary,
    type,
  },
}: JobDetailsPageProps) => {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="Company Logo"
            height={100}
            width={100}
            className="rounded-xl"
          />
        )}
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link href={`${new URL(applicationUrl).origin}`} className="text-blue-400 hover:underline" target="_blank">
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>

          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
                <Briefcase size={16} className="shrink-0"/> {/* shrink =>  Facteur de rétrécissement */}
                {type} 
            </p>
            <p className="flex items-center gap-1.5">
                <MapPin size={16} className="shrink-0"/> {/* shrink =>  Facteur de rétrécissement */}
                {locationType} 
            </p>
            <p className="flex items-center gap-1.5">
                <Globe2 size={16} className="shrink-0"/> {/* shrink =>  Facteur de rétrécissement */}
                {location || "Worldwide"} 
            </p>
            <p className="flex items-center gap-1.5">
                <Banknote size={16} className="shrink-0"/> {/* shrink =>  Facteur de rétrécissement */}
                {formatMoney(salary)} 
            </p>
        </div>
        </div>
      </div>
      <div>
        {description && <MarkdownPage>{description}</MarkdownPage>}
      </div>
    </section>
  );
};
