import compagnyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import { Badge } from "@/components/Badge";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from 'lucide-react';
import Image from "next/image";

interface JobListItemProps {
  job: Job;
}

export const JobListItem = ({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobListItemProps) => {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || compagnyLogoPlaceholder}
        alt="Logo de la compagnie"
        width={100}
        height={100}
        className="self-center rounded-lg"
        priority
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>

        <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5 sm:hidden">
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
            <p className="flex items-center gap-1.5 sm:hidden">
                <Clock size={16} className="shrink-0"/> {/* shrink =>  Facteur de rétrécissement */}
                {relativeDate(createdAt)} 
            </p>
        </div>
      </div>

      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size={16} />
            {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
};
